import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Patient } from "./types";
import type { DreaftPatient } from './types/index';

type PatientState = {
  patients: Patient[]
  activeId: Patient['id']
  addPatient: (data: DreaftPatient) => void
  deletePatient: (id: Patient['id']) => void
  getPatientById: (id: Patient['id']) => void
  updatePatient: (data: DreaftPatient) => void
}

const createPatient = (patient: DreaftPatient): Patient => {
  return { ...patient, id: crypto.randomUUID() }
} 

export const usePatientStore = create<PatientState>()(
  devtools(
    persist((set) => ({
      patients: [],
      activeId: '',
      addPatient: (data) => {
        const newPatient = createPatient(data);
        set((state) => ({
          patients: [...state.patients, newPatient]
        }))
      },
      deletePatient: (id) => {
        set(state => ({
          patients: state.patients.filter(patient => patient.id !== id),
        }))
      },
      getPatientById: (id) => {
        set({
          activeId: id
        })
      },
      updatePatient: (data) => {
        set(state => ({
          patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data }: patient),
          activeId: ''
        }))
      },
  }), {
    name: 'patient-storage',
  }))
);