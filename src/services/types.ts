export type IUser = {
  id: string
  contact: string
  username: string
  first_name: string
  last_name: string
  fullName: string
  phone_number: string
  public: boolean
  date_of_birth: string
  gender: string
  photo: string
  subscribed: boolean
  stripe_customer_id: string
  myPreference: any
  userGoals: any
  fullname: string
  primaryEmail: string
  enrolledPrograms: any
  isVIP: boolean
  dob: string
  isBanned: boolean
  location: string
  profilePic: string
  subscription: {
    createdAt: string
    type: string
    valid_from: string
    valid_To: string
    transaction_id: string
  }
}

export type IProductNames = 'Monthly' | '3-Months' | '6-Months' | '1 Year'

export type ISelectedProduct = {
  title: IProductNames
  weight: number
  value: string
}

export type IPlan = {
  interval_count: number
  interval: 'year' | 'month'
  amount?: number
  nickName?: string
  planName?: string
}

export type ISub = {
  plan: IPlan
  id?: string
  cancel_at_period_end?: boolean
  cancel_at?: number
  current_period_end?: number
  status: 'active' | 'canceled' | 'trialing' | 'past_due'
  latest_invoice?: IInvoice
  default_payment_method?: DefaultPaymentMethod
  type?: 'Stripe' | 'Mobile'
  typeName?: string
}

type StatusTransitions = {
  finalized_at: number
  paid_at: number
}

export type IInvoice = {
  amount_due: number
  id: string
  amount_paid: number
  hosted_invoice_url: string
  attemped: boolean
  billing_reason: 'upcoming' | 'subscription_create'
  next_payment_attempt: number
  created: number
  status_transitions: StatusTransitions
  status: 'draft' | 'paid'
}

type BillingDetails = {
  name: string
  email: string
}

export type DefaultPaymentMethod = {
  billing_details: BillingDetails
}

// {
//     "id": 4,
//     "username": "test",
//     "first_name": "Test First Name",
//     "last_name": "Test Last Name",
//     "phone_number": "+97699032894",
//     "email": null,
//     "stripe_customer_id": null,
//     "date_of_birth": "1992-07-07T00:00:00.000Z",
//     "gender": "male",
//     "public": true,
//     "subscribed": false,
//     "theme": "light",
//     "token": "12904",
//     "token_expiration": "2022-09-13T13:54:48.000Z",
//     "photo": "https://movefit-staging.s3.us-east-2.amazonaws.com/photo-1662884369951.jpg",
//     "started_program_id": null,
//     "createdAt": "2022-09-11T08:13:31.000Z",
//     "updatedAt": "2022-09-13T13:52:52.000Z",
//     "myPreference": {
//         "id": 2,
//         "user_id": 4,
//         "location": "gym",
//         "preference_id": 2,
//         "fitness_level": "intermediate",
//         "createdAt": "2022-09-11T08:19:30.000Z",
//         "updatedAt": "2022-09-11T08:19:30.000Z",
//         "preference": {
//             "id": 2,
//             "name": "Lift Weights",
//             "createdAt": "2022-09-02T16:17:33.000Z",
//             "updatedAt": "2022-09-02T16:17:33.000Z"
//         }
//     },
//     "userGoals": [
//         {
//             "id": 6,
//             "user_id": 4,
//             "goal_id": 2,
//             "createdAt": "2022-09-11T08:19:30.000Z",
//             "updatedAt": "2022-09-11T08:19:30.000Z",
//             "goal": {
//                 "id": 2,
//                 "name": "Build Muscle",
//                 "createdAt": "2022-09-02T16:17:33.000Z",
//                 "updatedAt": "2022-09-02T16:17:33.000Z"
//             }
//         },
//         {
//             "id": 7,
//             "user_id": 4,
//             "goal_id": 4,
//             "createdAt": "2022-09-11T08:19:30.000Z",
//             "updatedAt": "2022-09-11T08:19:30.000Z",
//             "goal": {
//                 "id": 4,
//                 "name": "Intense Cardio",
//                 "createdAt": "2022-09-02T16:17:33.000Z",
//                 "updatedAt": "2022-09-02T16:17:33.000Z"
//             }
//         }
//     ],
//     "enrolledPrograms": [],
//     "startedProgram": null,
//     "numberOfFollowers": 0,
//     "numberOfFollowing": 0
// }
