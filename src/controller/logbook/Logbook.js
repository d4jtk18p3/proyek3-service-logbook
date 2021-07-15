import { validationResult } from 'express-validator'
import logbookSchema from '../../dao/logbook/Logbook'
import axios from 'axios'

export const createLogbook = (req, res, next) => {
  try {
    const logbook = {
      nama: req.body.nama,
      nim: req.body.nim,
      kode_kelas: req.body.kode_kelas,
      kelas_proyek: req.body.kelas_proyek
    }
    const error = validationResult(req)
    if (!error.isEmpty()) {
      error.status = 400
      error.message = error.errors[0].msg
      throw error
    }
    logbookSchema.postLogbook(logbook)
      .then((result) => {
        res.status(200).json({
          logbook: result.data
        })
      })
      .catch(() => {
        const error = {
          status: 404,
          message: 'error creating logbook'
        }
        next(error)
      })
  } catch (error) {
    next(error)
  }
}

export const getLogbookById = (req, res, next) => {
  try {
    logbookSchema.getLogbook({ nim: req.params.nim })
      .then((result) => {
        res.status(200).json({
          logbook: result.data
        })
      })
      .catch(() => {
        const error = {
          status: 404,
          message: 'Logbook not found'
        }
        next(error)
      })
  } catch (error) {
    next(error)
  }
}

export const updateLogbook = (req, res, next) => {
  try {
    const logbook = {
      nama: req.body.tanggal,
      nim: req.body.kegiatan,
      kode_kelas: req.body.hasil,
      kelas_proyek: req.body.kesan,
      entri: req.body.entry
    }

    logbookSchema.updateEntriLogbook({ _id: req.params.id }, logbook)
      .then((result) => {
        res.status(200).json({
          logbook: result.data
        })
      })
      .catch(() => {
        const error = {
          status: 404,
          message: 'Logbook not found'
        }
        next(error)
      })
  } catch (error) {
    next(error)
  }
}

export const removeLogbook = (req, res, next) => {
  try {
    logbookSchema.deleteLogbook({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({
          logbook: result.data
        })
      })
      .catch(() => {
        const error = {
          status: 404,
          message: 'Logbook not found'
        }
        next(error)
      })
  } catch (error) {
    next(error)
  }
}
