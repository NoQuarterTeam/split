export const TEST_USER = {
  id: "25e1809c-33ae-424b-8f98-4678e29e6899",
  email: "jack@noquarter.co",
  firstName: "Jack",
  lastName: "Clackett",
  balance: 1211,
  avatar:
    "https://www-getsplit-co.s3.amazonaws.com/avatars/25e1809c-33ae-424b-8f98-4678e29e6899/jc2-jpeg",
}

export const TEST_HOUSE = {
  id: "1a2b3c4d-5e6f-7g8h-9i1j-2k3l4m5n6o7p",
  name: "Test house",
  users: [
    {
      id: "25e1809c-33ae-424b-8f98-4678e29e6899",
      email: "jack@noquarter.co",
      firstName: "Jack",
      lastName: "Clackett",
      balance: 1211,
      avatar:
        "https://www-getsplit-co.s3.amazonaws.com/avatars/25e1809c-33ae-424b-8f98-4678e29e6899/jc2-jpeg",
    },
    {
      id: "b2e2b2c4-6fbe-4257-9f98-f24116123361",
      email: "dan@noquarter.co",
      firstName: "Dan",
      lastName: "Le Cornu",
      balance: 502,
      avatar:
        "https://www-getsplit-co.s3.amazonaws.com/avatars/b2e2b2c4-6fbe-4257-9f98-f24116123361/dlc-squib-jpg",
    },
    {
      id: "e279f8c8-0a4a-465d-a038-f06a98d78595",
      email: "george@noquarter.co",
      firstName: "George",
      lastName: "Borg",
      balance: -1713,
      avatar:
        "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/23794829_10159729154370473_309970892997517855_n.jpg?_nc_cat=102&_nc_ht=scontent-amt2-1.xx&oh=0a9a9abfd07c3ed173b3552f719150ea&oe=5D16C12A",
    },
  ],
  invites: [],
}
export const TEST_COSTS = [
  {
    id: "2bc5e7aa-9a04-4ab8-952e-1c1343e558f4",
    name: "Lunch",
    amount: 3095,
    date: "2019-03-14T00:00:00+01:00",
    recurring: "one-off",
    equalSplit: false,
    category: "food",
    createdAt: "1552570789627",
    houseId: "37ac0827-a5c3-4fbd-a66a-d133277fc6f6",
    payerId: "25e1809c-33ae-424b-8f98-4678e29e6899",
    payer: {
      id: "25e1809c-33ae-424b-8f98-4678e29e6899",
      firstName: "Jack",
      lastName: "Clackett",
      avatar:
        "https://www-getsplit-co.s3.amazonaws.com/avatars/25e1809c-33ae-424b-8f98-4678e29e6899/jc2-jpeg",
    },
  },
  {
    id: "41a5a498-c5b0-4e9d-b3a0-777a4b42788a",
    name: "Food shop",
    amount: 1284,
    date: "2019-03-13T00:00:00+01:00",
    recurring: "one-off",
    equalSplit: false,
    category: "food",
    createdAt: "1552512377373",
    houseId: "37ac0827-a5c3-4fbd-a66a-d133277fc6f6",
    payerId: "25e1809c-33ae-424b-8f98-4678e29e6899",
    payer: {
      id: "25e1809c-33ae-424b-8f98-4678e29e6899",
      firstName: "Jack",
      lastName: "Clackett",
      avatar:
        "https://www-getsplit-co.s3.amazonaws.com/avatars/25e1809c-33ae-424b-8f98-4678e29e6899/jc2-jpeg",
    },
  },
  {
    id: "318f60f5-bc7f-4358-b212-6edfc23e6e80",
    name: "Internet",
    amount: 2165,
    date: "2019-03-12T00:00:00+01:00",
    recurring: "one-off",
    equalSplit: true,
    category: "food",
    createdAt: "1552417858573",
    houseId: "37ac0827-a5c3-4fbd-a66a-d133277fc6f6",
    payerId: "e279f8c8-0a4a-465d-a038-f06a98d78595",
    payer: {
      id: "e279f8c8-0a4a-465d-a038-f06a98d78595",
      firstName: "George",
      lastName: "Karatzas Borg",
      avatar:
        "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/23794829_10159729154370473_309970892997517855_n.jpg?_nc_cat=102&_nc_ht=scontent-amt2-1.xx&oh=0a9a9abfd07c3ed173b3552f719150ea&oe=5D16C12A",
    },
  },
  {
    id: "776c4a64-b82d-4232-9e3c-1d9e07fbbedb",
    name: "Breakfast",
    amount: 1485,
    date: "2019-03-12T00:00:00+01:00",
    recurring: "one-off",
    equalSplit: true,
    category: "food",
    createdAt: "1552400365503",
    houseId: "37ac0827-a5c3-4fbd-a66a-d133277fc6f6",
    payerId: "25e1809c-33ae-424b-8f98-4678e29e6899",
    payer: {
      id: "25e1809c-33ae-424b-8f98-4678e29e6899",
      firstName: "Jack",
      lastName: "Clackett",
      avatar:
        "https://www-getsplit-co.s3.amazonaws.com/avatars/25e1809c-33ae-424b-8f98-4678e29e6899/jc2-jpeg",
    },
  },
  {
    id: "cc65c470-a0c5-4777-b46a-a993eed6f294",
    name: "Beers",
    amount: 1610,
    date: "2019-03-11T00:00:00+01:00",
    recurring: "one-off",
    equalSplit: false,
    category: "food",
    createdAt: "1552337157151",
    houseId: "37ac0827-a5c3-4fbd-a66a-d133277fc6f6",
    payerId: "b2e2b2c4-6fbe-4257-9f98-f24116123361",
    payer: {
      id: "b2e2b2c4-6fbe-4257-9f98-f24116123361",
      firstName: "Dan",
      lastName: "Le Cornu",
      avatar:
        "https://www-getsplit-co.s3.amazonaws.com/avatars/b2e2b2c4-6fbe-4257-9f98-f24116123361/dlc-squib-jpg",
    },
  },
]
