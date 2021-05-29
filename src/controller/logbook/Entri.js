import mongoose from 'mongoose'
import entriSchema from '../../dao/logbook/Entri'
import logbookSchema from '../../dao/logbook/Logbook'

export function createEntri (req, res, next) {
  const entri = {
    tanggal: req.body.tanggal,
    kegiatan: req.body.kegiatan,
    hasil: req.body.hasil,
    kesan: req.body.kesan
  }

  entri._id = mongoose.Types.ObjectId()

  entriSchema.postEntri(entri, function (err, entri) {
    if (err) {
      res.json({
        error: err
      })
    }

    res.json({
      message: 'Entri created successfully',
      entri: entri
    })
  })

  // Update entris list
  const condition = { _id: req.params.id_logbook }
  logbookSchema.getLogbook(condition, function (err, logbook) {
    if (err) {
      console.log('Logbook with was not found')
    }

    const newEntri = entri._id.toString()
    const len = logbook[0].entri.length
    const newLogbook = logbook[0]
    newLogbook.entri[len] = newEntri
    logbookSchema.updateEntriLogbook(condition, newLogbook, function (err, res) {
      if (err) {
        console.log('Failed to update caused by: ', err)
      }

      console.log('Success update:')
      console.log(res)
    })
  })
}

export function getEntri (req, res, next) {
  entriSchema.getEntri({ _id: req.params.id }, function (err, entri) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      entri: entri
    })
  })
}

export function updateEntri (req, res, next) {
  const entri = {
    tanggal: req.body.tanggal,
    kegiatan: req.body.kegiatan,
    hasil: req.body.hasil,
    kesan: req.body.kesan
  }
  entriSchema.updateEntri({ _id: req.params.id }, entri, function (err, entri) {
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
  entriSchema.deconsteEntri({ _id: req.params.id }, function (err, entri) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Entri deconsted successfully'
    })
  })
}
