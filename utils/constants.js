export const ROLE = {
  ADMIN: 'admin',
  KOMISI_ANAK: 'komisi anak',
  KOMISI_REMAJA: 'komisi remaja',
  KOMISI_PEMUDA: 'komisi pemuda',
  KOMISI_DEWASA: 'komisi dewasa',
  KOMISI_USIA_LANJUT: 'komisi usia lanjut',
  KOMISI_KESENIAN: 'komisi kesenian',
  KOMISI_MULTIMEDIA: 'komisi multimedia',
  U1: 'U1',
  U2: 'U2',
  U3: 'U3',
  U4: 'U4',
  U5: 'U5',
  U6: 'U6',
  U7: 'U7',
  U8: 'U8'
}

export const RUANGAN_STATUS = {
  AVAILABLE: 'Available',
  OCCUPIED: 'Occupied',
  WAITING: 'Waiting'
}

export const PROGRAM_KERJA = {
  ALL: 'All',
  APPROVE: 'Approved',
  PENDING: 'Pending',
  DENIED: 'Denied',
  DONE: 'Done'
}

export const GUDANG = {
  GUDANG_A: 'gudang A',
  GUDANG_B: 'gudang B'
}

export const MULTIMEDIA = {
  MULTIMEDIA_A: 'multimedia A',
  MULTIMEDIA_B: 'multimedia B'
}

export const ASETLAIN = {
  ASETLAIN_A: 'aset lain A',
  ASETLAIN_B: 'aset lain B'
}

export const ADMINISTRASI = {
  DEBIT: 'debit',
  KREDIT: 'kredit'
}

export const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined'
}

export const JOB_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship'
}

export const JOB_SORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a'
}

export const KATEGORI = {
  RUANGAN: 'ruangan',
  GUDANG: 'gudang',
  MULTIMEDIA: 'multimedia',
  ASETLAIN: 'aset lain',
  SURAT_MASUK: 'surat masuk',
  SURAT_KELUAR: 'surat keluar',
  ADMINISTRASI_PENERIMAAN: 'administrasi penerimaan',
  ADMINISTRASI_PENGELUARAN: 'administrasi pengeluaran',
  PROGRAM_KERJA: 'program kerja',
  VIATIKUM: 'viatikum',
  LOG: 'log',
  USER: 'user'
}

export const ACTION = {
  // umum
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  // beberapa
  EXPORT: 'export to excel',
  IMPORT: 'import from csv',
  // proker dan ruang
  APPROVE: 'approve',
  DENY: 'deny',
  DONE: 'done',
  // ruangan
  BOOKING: 'booking'
}
