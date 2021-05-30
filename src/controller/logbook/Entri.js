import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import entriSchema from '../../dao/logbook/Entri'
import logbookSchema from '../../dao/logbook/Logbook'

export const createEntri = (req, res, next) => {
  try {
    const entri = {
      tanggal: req.body.tanggal,
      kegiatan: req.body.kegiatan,
      hasil: req.body.hasil,
      kesan: req.body.kesan
    }

    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      error.message = error.errors[0].msg
      throw error
    }

    entri._id = mongoose.Types.ObjectId()
    entriSchema.postEntri(entri)
      .then((result) => {
        res.status(200).json({
          message: 'Entri created successfully',
          entri: result
        })
      })
      .catch((err) => {
        console.error(err)

        const error = {
          status: 400,
          message: 'Failed to create entri'
        }

        next(error)
      })

    // Get logbook
    const condition = { _id: req.params.id_logbook }
    let logbook = {}
    logbookSchema.getLogbook(condition)
      .then((result) => {
        logbook = {
          data: result.data
        }

        // Update entri list
        const newLogbook = logbook.data[0]
        const len = logbook.data[0].entri.length
        newLogbook.entri[len] = entri._id.toString()
        logbookSchema.updateEntriLogbook(condition, newLogbook)
          .then((result) => {
            console.log('Success update entri: ', result)
          })
          .catch(() => {
            const error = {
              status: 404,
              message: 'Failed to update logbook'
            }
            console.error(error)
          })
      })
      .catch(() => {
        const error = {
          status: 404,
          message: 'Logbook not found'
        }
        console.error(error)
      })
  } catch (error) {
    next(error)
  }
}

export const getEntri = (req, res, next) => {
  entriSchema.getEntri({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        entri: result.data
      })
    })
    .catch((err) => {
      console.error(err)

      const error = {
        status: 404,
        message: 'Entri not found'
      }

      next(error)
    })
}

export const updateEntri = (req, res, next) => {
  try {
    const entri = {
      tanggal: req.body.tanggal,
      kegiatan: req.body.kegiatan,
      hasil: req.body.hasil,
      kesan: req.body.kesan
    }

    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      error.message = error.errors[0].msg
      throw error
    }

    entriSchema.updateEntri({ _id: req.params.id }, entri)
      .then((result) => {
        res.status(200).json({
          message: 'Entri updated successfully'
        })
      })
      .catch((err) => {
        console.error(err)

        const error = {
          status: 400,
          message: 'Failed to update entri'
        }

        next(error)
      })
  } catch (error) {
    next(error)
  }
}

export function updateEntriByDate (req, res, next) {
  const entri = {
    tanggal: req.body.tanggal,
    kegiatan: req.body.kegiatan,
    hasil: req.body.hasil,
    kesan: req.body.kesan
  }
  entriSchema.updateEntri({ tanggal: req.query.tanggal }, entri, function (err, entri) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Entri updated successfully'
    })
  })
}

export function removeEntri (req, res, next) {
  try {
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      error.message = error.errors[0].msg
      throw error
    }

    // Update entris list
    const condition = { _id: req.params.id_logbook }
    let logbook = {}
    logbookSchema.getLogbook(condition)
      .then((result) => {
        logbook = {
          data: result.data
        }

        const delEntri = req.query.id
        const len = logbook.data[0].entri.length
        const newLogbook = logbook.data[0]
        for (let i = 0; i < len; i++) {
          if (JSON.stringify(newLogbook.entri[i]) === JSON.stringify(delEntri)) {
            newLogbook.entri.splice(i, 1)
            i--
          }
        }

        logbookSchema.updateEntriLogbook(condition, newLogbook)
          .then((result) => {
            console.log('Success update', result)
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch(() => {
        console.error('Logbook not found')
      })

    entriSchema.deleteEntri({ _id: req.query.id })
      .then((result) => {
        res.status(200).json({
          message: 'Entri deleted successfully',
          entri: result.data
        })
      })
      .catch((err) => {
        console.error(err)

        const error = {
          status: 400,
          message: 'Failed to update entri'
        }

        next(error)
      })
  } catch (error) {
    next(error)
  }
}

export function removeEntriByDate (req, res, next) {
  // Update entris list
  const condition = { _id: req.params.id_logbook }
  logbookSchema.getLogbook(condition, function (err, logbook) {
    if (err) {
      console.log('Logbook with was not found')
    } else {
      console.log('found')
    }

    const delEntri = { tanggal: req.query.tanggal }
    const len = logbook.entri.length
    const newLogbook = logbook
    for (let i = 0; i < len; i++) {
      if (newLogbook.entri[i] === delEntri) {
        newLogbook.entri.splice(i, 1)
        i--
      }
    }
    logbookSchema.updateEntriLogbook(condition, newLogbook, function (err, res) {
      if (err) {
        console.log('Failed to update caused by: ', err)
      }
      console.log('Success update:')
      console.log(res)
    })
  })

  entriSchema.deleteEntri({ _id: req.query.id }, function (err, entri) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Entri deleted successfully',
      entri: entri
    })
  })
}
