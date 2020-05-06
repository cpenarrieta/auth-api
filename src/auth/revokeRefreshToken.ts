import prisma from '../context'

export const revokeRefreshToken = async (userId) => {
  const user = await prisma.user.findOne({
    where: {
      id: userId
    }
  })

  await prisma.user.update({
    where: { id: userId },
    data: { 
      tokenVersion: user.tokenVersion + 1
    },
  })

  return true
}