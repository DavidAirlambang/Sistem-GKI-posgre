import { RUANGAN_STATUS } from '../utils/constants'

const mongoose = require('mongoose')

const ruanganSchema = new mongoose.Schema(
  {
    no_ruangan: {
      type: String,
      required: true,
      unique: true
    },
    nama_ruangan: String,
    kapasitas_ruangan: Number,
    fasilitas_ruangan: [String],
    jadwal: Date,
    status: {
      type: String,
      enum: Object.values(RUANGAN_STATUS),
      default: RUANGAN_STATUS.AVAILABLE
    }
  },
  { timestamps: true }
)
 
export default mongoose.model('Ruangan', ruanganSchema)
