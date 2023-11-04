import { authMiddleware } from '@clerk/nextjs'

// 设置白名单路由
export default authMiddleware({
  publicRoutes: ['/']
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
