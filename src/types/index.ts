

export type Patient = {
  id: string
  name: string
  caretraker: string
  email: string
  date: Date
  symptoms: string
}

export type DreaftPatient = Omit<Patient, 'id'>