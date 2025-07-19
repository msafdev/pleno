import { Avatar as AvatarContainer, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const Avatar = ({
  src,
  alt,
  fallback,
  className = ''
}: {
  src: string
  alt: string
  fallback: string
  className?: string
}) => {
  return (
    <AvatarContainer className={cn('size-10 rounded-md', className)}>
      <AvatarImage src={src} alt={alt} className="!m-0" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarContainer>
  )
}

export default Avatar
