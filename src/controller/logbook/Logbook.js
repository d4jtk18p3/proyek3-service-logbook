import logbookSchema from '../../dao/logbook/Logbook'

export function createLogbook (req, res, next) {
  const logbook = {
    nama: req.kauth.grant.access_token.nama,
    nim: req.kauth.grant.access_token.nim,
    kode_kelas: req.kauth.grant.access_token.kode_kelas,
    kelas_proyek: req.body.kelas_proyek // diisi kode mata kuliah

    // nama: req.body.nama,
    // nim: req.body.nim,
    // kode_kelas: req.body.kode_kelas,
    // kelas_proyek: req.body.kelas_proyek
  }
  logbookSchema.postLogbook(logbook, function (err, logbook) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Logbook created successfully',
      logbook: logbook
    })
  })
}

export function getLogbookByNim (req, res, next) {
  logbookSchema.getLogbook({ nim: req.params.nim }, function (err, logbook) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      entri: logbook[0].entri
    })
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

  logbookSchema.updateEntriLogbook({ _id: req.params.id }, logbook, function (err, logbook) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Logbook updated successfully'
    })
  })
}

export function removeLogbook (req, res, next) {
  logbookSchema.deleteLogbook({ _id: req.params.id }, function (err, logbook) {
    if (err) {
      res.json({
        error: err
      })
    }
    res.json({
      message: 'Logbook deleted successfully'
    })
  })
}
