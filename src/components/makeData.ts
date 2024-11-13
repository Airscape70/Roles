export type User = {
  id: string;
  firstName: string;
  role: string;
  availability: boolean;
};
export type Role = {
  id: string;
  roleName: string;
  description: string[];
  users: string[]
};



export const fakeData: User[] = [
  {
    id: "9s41rp",
    firstName: "Иванов А.А.",
    role: "администратор",
    availability: true,
  },
  {
    id: "08m6rx",
    firstName: "Петров А.А.",
    role: "разработчик",
    availability: false,
  },
  {
    id: "9s41rp",
    firstName: "Иванов А.А.",
    role: "администратор",
    availability: true,
  },
  {
    id: "08m6rx",
    firstName: "Петров А.А.",
    role: "разработчик",
    availability: false,
  },
  {
    id: "9s41rp",
    firstName: "Иванов А.А.",
    role: "администратор",
    availability: true,
  },
  {
    id: "08m6rx",
    firstName: "Петров А.А.",
    role: "разработчик",
    availability: false,
  },
];

export const fakeRole: Role[] = [
  {
    id: '1',
    roleName: 'Администратор',
    description: ['permission 1', 'permission 2'],
    users: ['Иванов А.А', 'Петров П.П']
  },
  {
    id: '2',
    roleName: 'Менеджер',
    description: ['permission 3', 'permission 2'],
    users: ['Игнатов Д.А', 'Валитова П.П']
  },
  {
    id: '3',
    roleName: 'Разработчик',
    description: ['permission 4'],
    users: ['Иванов Р.А', 'Ким П.П']
  },
  {
    id: '4',
    roleName: 'Директор',
    description: ['permission 1', 'permission 2','permission 3','permission 4'],
    users: ['Бугаева К.А']
  },
]






//50 us states array
export const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Puerto Rico",
];
