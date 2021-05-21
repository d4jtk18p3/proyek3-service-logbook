import logbookSchema from '../../dao/logbook/Logbook';

export function createLogbook (req, res, next) {
    var logbook = {
        nama: req.body.tanggal,
        nim: req.body.kegiatan,
        kode_kelas: req.body.hasil,
        kelas_proyek: req.body.kesan,
    };
    logbookSchema.postLogbook(logbook, function(err, logbook) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            message : "Logbook created successfully"
        })
    })
}

export function getLogbookByNim(req, res, next) {
    logbookSchema.getById({nim: req.params.nim}, function(err, logbook) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            entri: logbook.entri
        })
    })
}

export function updateLogbook(req, res, next) {
    var logbook = {
        nama: req.body.tanggal,
        nim: req.body.kegiatan,
        kode_kelas: req.body.hasil,
        kelas_proyek: req.body.kesan,
        entri: req.body.entry
    }
    //get logbook, get semua entri dari logbook tsb
    //update listnya, namanya newEntri
    logbookSchema.updateEntriLogbook({_id: req.params.id}, newEntri, function(err, logbook) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Logbook updated successfully"
        })
    })
}

export function removeLogbook(req, res, next) {
    logbookSchema.deleteLogbook({_id: req.params.id}, function(err, logbook) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Logbook deleted successfully"
        })
    })
}