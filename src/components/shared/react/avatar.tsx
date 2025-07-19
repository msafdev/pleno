import { Avatar as AvatarContainer, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Avatar = ({
  src,
  alt,
  fallback
}: {
  src: string
  alt: string
  fallback: string
}) => {
  return (
    <AvatarContainer className='size-10 rounded-md'>
      <AvatarImage src={src} alt={alt} className='!m-0' />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarContainer>
  )
}

export default Avatar