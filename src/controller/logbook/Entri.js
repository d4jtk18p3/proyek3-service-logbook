import mongoose from 'mongoose'
import { validationResult } from 'express-validator'
import entriSchema from '../../dao/logbook/Entri'
import logbookSchema from '../../dao/logbook/Logbook'
import * as perkuliahanController from '../Perkuliahan'
import * as StudiDAO from '../../dao/Studi'
import * as PerkuliahanDAO from '../../dao/Perkuliahan'

export const createEntri = (req, res, next) => {
  try {
    const stringDate = req.body.tanggal.split('/')
    const year = parseInt(stringDate[0], 10)
    const month = parseInt(stringDate[1], 10) - 1 // urutan bulan dimulai dari 0
    const day = parseInt(stringDate[2], 10)
    const date = new Date(year, month, day, 7)
    console.log("INI DARI BODy "+ req.body.tanggal)
    console.log("TANGGAL "+ date)
    const entri = {
      tanggal: date,
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
    const nim = req.params.nim
    const resultStudi = []
    StudiDAO.getStudiByIdMahasiswa(nim)
    .then((result) => {
      for( let i = 0; i<result.length; i++){
        resultStudi.push(result[i])
      }
      const resultIdPerkuliahan = []
      for (let i = 0; i < resultStudi.length; i++) {
        const result = resultStudi[i].id_perkuliahan
        if (result != null) {
          resultIdPerkuliahan.push(result)
        }
      }
      if (resultIdPerkuliahan instanceof Error) {
        throw resultIdPerkuliahan
      }
  
      const resultMatkul = []
      for (let i = 0; i < resultIdPerkuliahan.length; i++) {
        PerkuliahanDAO.getPerkuliahanById(resultIdPerkuliahan[i])
        .then((result) => {
          if(result!=null){
            resultMatkul.push(result)
          }
          if(i===resultIdPerkuliahan.length-1){
          const condition = { nim: req.params.nim, kelas_proyek: resultMatkul[resultMatkul.length-1].id_mata_kuliah}
    
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
          }
        })
        .catch(() => {
          const error = {
            status: 404,
            message: 'Perkuliahan not found'
          }
    
          console.error(error)
        })
       
      }
     
      if (resultMatkul instanceof Error) {
        throw resultMatkul
      }
      
    })
    .catch(() => {
      const error = {
        status: 404,
        message: 'Studi not found'
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
          message: 'Entri updated successfully',
          data: result.data
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
          message: 'Failed to delete entri'
        }

        next(error)
      })
  } catch (error) {
    next(error)
  }
}

export function removeEntriByDate (req, res, next) {
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

        const queryDate = req.query.tanggal.split('-')
        const year = parseInt(queryDate[0], 10)
        const month = parseInt(queryDate[1], 10) - 1 // urutan bulan dimulai dari 0
        const day = parseInt(queryDate[2], 10)
        const date = new Date(year, month, day, 24)
        let len = logbook.data[0].entri.length
        const newLogbook = logbook.data[0]
        let i = 0
        while (i < len) {
          console.log('INI I TAU', i)
          entriSchema.getEntri({ _id: newLogbook.entri[i]._id })
            .then((result) => {
              if (result.data[0].tanggal.getDate() === date.getDate()) {
                newLogbook.entri.splice(i, 1)
                i--
                len--
                console.log('YANG BARU', newLogbook)
                logbookSchema.updateEntriLogbook(condition, newLogbook)
                  .then((result) => {
                    console.log('Success update logbook', result)
                  })
                  .catch((err) => {
                    console.error(err)
                  })

                entriSchema.deleteEntri({ _id: newLogbook.entri[i]._id })
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
                      message: 'Failed to delete entri'
                    }

                    next(error)
                  })
              }
            })
            .catch((err) => {
              console.error(err)
            })

          i++
        }
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    next(error)
  }
}
