// Team section content (About page). One lead + four members.
//
// `photo` is an imported image (src/assets/team/, face-cropped, ~0.9 aspect for the hexagon).
// With no photo the hexagon shows a neutral placeholder avatar — swap in a real photo by
// adding the file and setting `photo`. Bios describe each role only; extend them with real
// background once the people are happy with the wording.

import asad from '@/assets/team/asad.webp'
import mehmood from '@/assets/team/mehmood.webp'
import qasim from '@/assets/team/qasim.webp'
import waqas from '@/assets/team/waqas.webp'

export const teamLead = {
  name: 'Waqas Ahmad Asghar',
  role: 'CEO & Full-Stack Architect',
  bio: 'Leads Oryan Techsol and architects and builds its solutions end to end, working with clients from the first conversation to launch so every build fits the way their business actually works.',
  photo: waqas,
}

export const teamMembers = [
  {
    name: 'Qasim Amjad Virk',
    role: 'Director & Financial Partner',
    bio: 'A key backer of Oryan Techsol, supporting the company’s growth and financial foundation.',
    photo: qasim,
  },
  {
    name: 'Slaman Amjad Virk',
    role: 'Director & Financial Partner',
    bio: 'A key backer of Oryan Techsol, supporting the company’s growth and financial foundation.',
    photo: null, // placeholder avatar until a real photo is supplied
  },
  {
    name: 'Mehmood Asghar',
    role: 'React Native Developer',
    bio: 'Builds our cross-platform mobile apps for iOS and Android.',
    photo: mehmood,
  },
  {
    name: 'Rai Asad Kharal',
    role: 'Sales and Marketing Head',
    bio: 'Leads sales, marketing and client relationships, helping businesses find the right solution for their goals.',
    photo: asad,
  },
]
