import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.device.deleteMany()
  await prisma.employee.deleteMany()

  const alice = await prisma.employee.create({
    data: {
      name: 'Alice',
      role: 'Developer'
    }
  })

  const bob = await prisma.employee.create({
    data: {
      name: 'Bob',
      role: 'Designer'
    }
  })

  await prisma.device.createMany({
    data: [
      { name: 'MacBook Pro 14"', type: 'Laptop', ownerId: alice.id },
      { name: 'Dell XPS 13', type: 'Laptop', ownerId: bob.id },
      { name: 'Logitech MX Master 3', type: 'Peripheral', ownerId: alice.id },
      { name: 'LG UltraFine 27"', type: 'Display', ownerId: null }
    ]
  })
}

main()
  .then(async () => {
    console.log('Seed terminé ✅')
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
