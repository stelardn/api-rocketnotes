const UserCreateService = require("./UserCreateService");

const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {

  let userRepository = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  })

  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory();

    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("user should not be created with existing email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    };

    // const userRepository = new UserRepositoryInMemory();
    // const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute(user1);
    // await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso!"));
    // ou

    expect(async () => {
      await userCreateService.execute(user2)
    }).rejects.toEqual(new AppError("Este email já está em uso!"));
  });

})
