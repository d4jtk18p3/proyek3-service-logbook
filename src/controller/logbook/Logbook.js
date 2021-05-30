import logbookSchema from '../../dao/logbook/Logbook'

export function createLogbook (req, res, next) {
  const logbook = {
    nama: req.body.nama,
    nim: req.body.nim,
    kode_kelas: req.body.kode_kelas,
    kelas_proyek: req.body.kelas_proyek
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
}

export function getLogbookById (req, res, next) {
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
}

export function updateLogbook (req, res, next) {
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
}

export function removeLogbook (req, res, next) {
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
}
