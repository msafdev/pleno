import { useEffect, useState } from 'react'
import { ActivityCalendar, type Activity } from 'react-activity-calendar'

type ContributionDay = {
  date: string
  contributionCount: number
}

type GitHubCalendarProps = {
  user: string
  token?: string
}

type CacheData = {
  data: Activity[]
  timestamp: number
}

const GITHUB_GQL_ENDPOINT = 'https://api.github.com/graphql'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export default function GitHubCalendar({ user, token }: GitHubCalendarProps) {
  const [activityData, setActivityData] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const getCachedData = (key: string): Activity[] | null => {
    if (typeof window === 'undefined') return null
    const cachedString = localStorage.getItem(key)
    if (!cachedString) return null

    try {
      const cached: CacheData = JSON.parse(cachedString)
      const isExpired = Date.now() - cached.timestamp > CACHE_DURATION
      if (isExpired) {
        localStorage.removeItem(key)
        return null
      }
      return cached.data
    } catch {
      return null
    }
  }

  const setCachedData = (key: string, data: Activity[]) => {
    if (typeof window === 'undefined') return
    const cacheEntry: CacheData = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(cacheEntry))
  }

  const normalizeContributions = (days: ContributionDay[]): Activity[] => {
    if (!days.length) return []
    const maxContributions = Math.max(...days.map((d) => d.contributionCount))
    return days.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: calculateLevel(day.contributionCount, maxContributions)
    }))
  }

  const calculateLevel = (count: number, max: number): number => {
    if (count === 0) return 0
    if (count >= max * 0.75) return 4
    if (count >= max * 0.5) return 3
    if (count >= max * 0.25) return 2
    return 1
  }

  const fetchGitHubData = async (username: string, authToken?: string): Promise<Activity[]> => {
    if (!authToken) {
      throw new Error('GitHub token is required')
    }

    const query = `
      query($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            totalCommitContributions
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch(GITHUB_GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        query,
        variables: { userName: username }
      })
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const json = await response.json()
    const contributionCalendar = json?.data?.user?.contributionsCollection?.contributionCalendar
    const weeks = contributionCalendar?.weeks
    const days: ContributionDay[] = weeks.flatMap((week: any) => week.contributionDays)
    return normalizeContributions(days)
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const cacheKey = `github-contrib-${user}`

      const cachedData = getCachedData(cacheKey)
      if (cachedData) {
        setActivityData(cachedData)
        setIsLoading(false)
        return
      }

      try {
        const githubToken = token || import.meta.env.PUBLIC_GITHUB_TOKEN
        const data = await fetchGitHubData(user, githubToken)

        setCachedData(cacheKey, data)
        setActivityData(data)
      } catch (err) {
        console.error(err)
        setActivityData([])
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user, token])

  if (error) return null

  return (
    <div className="font-medium text-foreground/60 text-xs mb-8">
      <ActivityCalendar
        data={activityData}
        loading={isLoading}
        blockSize={12}
        blockMargin={4}
        colorScheme="light"
        theme={{
          light: ['var(--color-muted)', 'var(--color-muted-foreground)']
        }}
      />
    </div>
  )
}
