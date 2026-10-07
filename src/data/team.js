// Team section content (About page). One lead + four members. Used as the default; once the
// admin backend manages the team (see src/lib/cms), the admin's version is shown instead.
//
// `photo` is a public URL (files live in public/team/, face-cropped ~0.9 aspect for the
// hexagon). With no photo the hexagon shows a neutral placeholder avatar. Bios describe each
// role only — extend them with real background once the people are happy with the wording.

export const teamLead = {
  name: 'Waqas Ahmad Asghar',
  role: 'CEO & Full-Stack Architect',
  bio: 'Leads Oryan Techsol and architects and builds its solutions end to end, working with clients from the first conversation to launch so every build fits the way their business actually works.',
  photo: '/team/waqas.webp',
}

export const teamMembers = [
  {
    name: 'Qasim Amjad Virk',
    role: 'Director & Financial Partner',
    bio: 'A key backer of Oryan Techsol, supporting the company’s growth and financial foundation.',
    photo: '/team/qasim.webp',
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
    photo: '/team/mehmood.webp',
  },
  {
    name: 'Rai Asad Kharal',
    role: 'Sales and Marketing Head',
    bio: 'Leads sales, marketing and client relationships, helping businesses find the right solution for their goals.',
    photo: '/team/asad.webp',
  },
]
