import entriSchema from '../../dao/logbook/Entri';

export function createEntri (req, res, next) {
    console.log("masuk1")
    var entri = {
        tanggal: req.body.tanggal,
        kegiatan: req.body.kegiatan,
        hasil: req.body.hasil,
        kesan: req.body.kesan
    };
    console.log("masuk2")
    entriSchema.postEntri(entri, function(err, entri) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            message : "Entri created successfully"
        })
    })
}

export function getEntri(req, res, next) {
    entriSchema.getById({_id: req.params.id}, function(err, entri) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            entri: entri
        })
    })
}

export function updateEntri(req, res, next) {
    var entri = {
        tanggal: req.body.tanggal,
        kegiatan: req.body.kegiatan,
        hasil: req.body.hasil,
        kesan: req.body.kesan
    }
    entriSchema.putEntri({_id: req.params.id}, entri, function(err, entri) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Entri updated successfully"
        })
    })
}

export function removeEntri(req, res, next) {
    entriSchema.deleteEntri({_id: req.params.id}, function(err, entri) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Entri deleted successfully"
        })
    })
}