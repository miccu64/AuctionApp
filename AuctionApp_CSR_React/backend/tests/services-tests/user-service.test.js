import { encrypt } from '../../security/password-utils.js'
import { createAuction } from '../../services/auctions-service.js'
import {
  createUser,
  getAllAuctionsCreatedByUser,
  getUserById,
  getUserByLogin,
  trySignInUser
} from '../../services/user-service.js'
import { createDateWithAddedYears, createNotNullTestUser } from '../utils/test-utils.js'

describe('Models creation tests', () => {
  test('Create user', async () => {
    const login = 'a'
    const password = 'b'
    const fullName = 'c'
    const user = await createUser(login, password, fullName)
    expect(user).not.toBeNull()
    expect(user.getDataValue('password')).toEqual(encrypt(password))
    expect(user.getDataValue('fullName')).toEqual(fullName)
  })

  test('Not create user with existing login', async () => {
    const user1 = await createUser('a', 'a', 'a')
    expect(user1).not.toBeNull()

    let user2
    try {
      user2 = await createUser('a', 'a', 'a')
    } catch {
    } finally {
      expect(user2).toBeFalsy()
    }
  })

  test('Return user by login', async () => {
    const user = await createUser('a', 'a', 'a')
    expect(user).not.toBeNull()

    const dbUser = await getUserByLogin(user.getDataValue('login'))
    expect(dbUser).not.toBeNull()
  })

  test('Should sign in existing user', async () => {
    const login = 'a'
    const password = 'a'
    const user = await createUser(login, password, 'a')
    expect(user).not.toBeNull()

    const token = await trySignInUser(login, password)
    expect(token?.length).toBeGreaterThan(0)
  })

  test('Should refuse sign in when password is wrong', async () => {
    const login = 'a'
    const password = 'a'
    const user = await createUser(login, password, 'a')
    expect(user).not.toBeNull()

    const token = await trySignInUser(login, password + 'a')
    expect(token).toBeFalsy()
  })

  test('Should refuse sign in when user does not exist', async () => {
    const token = await trySignInUser('a', 'a')
    expect(token).toBeFalsy()
  })

  test('Should get user by id', async () => {
    const user = await createNotNullTestUser()
    const dbUser = await getUserById(user.getDataValue('id'))
    expect(dbUser).not.toBeNull()
  })

  test('Return active and inactive auctions created by user', async () => {
    const user1 = await createUser('a1', 'a', 'a')
    const user2 = await createUser('a2', 'a', 'a')
    expect(user1).not.toBeNull()
    expect(user2).not.toBeNull()

    const currentDate = new Date()
    const futureDate = createDateWithAddedYears(1)
    const pastDate = createDateWithAddedYears(-1)
    const user1auction1 = await createAuction('a', 'a', currentDate, futureDate, 111, user1)
    const user1auction2 = await createAuction('a', 'a', pastDate, pastDate, 111, user1)
    const user2auction1 = await createAuction('a', 'a', currentDate, futureDate, 111, user2)
    const user2auction2 = await createAuction('a', 'a', pastDate, pastDate, 111, user2)
    expect(user1auction1).not.toBeNull()
    expect(user1auction2).not.toBeNull()
    expect(user2auction1).not.toBeNull()
    expect(user2auction2).not.toBeNull()

    const auctions = await getAllAuctionsCreatedByUser(user1.getDataValue('id'))
    expect(auctions.length).toEqual(2)

    const auctionIds = auctions.map((a) => a.getDataValue('id'))
    expect(auctionIds).toContain(user1auction1.getDataValue('id'))
    expect(auctionIds).toContain(user1auction2.getDataValue('id'))
  })
})
