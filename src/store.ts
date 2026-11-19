import { create } from "zustand";
import type { Patient } from "./types";
import type { DreaftPatient } from './types/index';

type PatientState = {
  patients: Patient[]
  addPatient: (data: DreaftPatient) => void
}

const createPatient = (patient: DreaftPatient): Patient => {
  return { ...patient, id: crypto.randomUUID() }
} 

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  addPatient: (data) => {
    const newPatient = createPatient(data);
    set((state) => ({
      patients: [...state.patients, newPatient]
    }))
  },
}));