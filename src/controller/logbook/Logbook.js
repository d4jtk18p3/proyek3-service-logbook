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
        sendEmail(req.body.nim, 'Logbook berhasil buat', emailBody)
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

const sendEmail = async (nim, subject, body) => {
  try {
    await axios.post('http://localhost:5000/email-notif/personal', {
      idUser: nim,
      subject: subject,
      bodyEmail: body
    })
    return true
  } catch (e) {
    return false
  }
}

const emailBody = '<html>\n' +
  '<head>\n' +
  '    <meta charset="utf-8">\n' +
  '    <title>Politeknik Negeri Bandung</title>\n' +
  '    <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">\n' +
  '    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@600&display=swap" rel="stylesheet">\n' +
  '\n' +
  '    <style>\n' +
  '        .button {\n' +
  '            background-color: #59DCDC;\n' +
  '            border: none;\n' +
  '            color: white;\n' +
  '            padding: 20px;\n' +
  '            text-align: center;\n' +
  '            text-decoration: none;\n' +
  '            display: inline-block;\n' +
  '            font-family: \'Work Sans\', sans-serif;\n' +
  '            font-size: 16px;\n' +
  '            margin: 4px 2px;\n' +
  '            cursor: pointer;\n' +
  '            border-radius: 8px;\n' +
  '            width: 120px;\n' +
  '        }\n' +
  '\n' +
  '        #header, #content, #footer {\n' +
  '            background-color: #FFFFFF;\n' +
  '        }\n' +
  '\n' +
  '        #paragraph {\n' +
  '            font-size: 16px;\n' +
  '        }\n' +
  '\n' +
  '        @media only screen and (max-width: 400px) {\n' +
  '            #paragraph {\n' +
  '                font-size: 10px;\n' +
  '            }\n' +
  '        }\n' +
  '    </style>\n' +
  '</head>\n' +
  '<body style="background-color: #e4e4e4; margin: 0;">\n' +
  '    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">\n' +
  '        <!-- <tbody style="background-color: #000000;"> -->\n' +
  '            <!-- START HEADER -->\n' +
  '            <table id="header" width="100%" height="100" align="center" cellpadding="0" cellspacing="0" style="border: 1px #C9C9C9 solid;">\n' +
  '                <tr>\n' +
  '                    <td align="center" width="50" style="padding: 5px 10px 0px;">\n' +
  '                        <img alt="Logo Politeknik Negeri Bandung" src="logo-polban.png" width="35">\n' +
  '                    </td>\n' +
  '                    <td style="font-family: \'Montserrat\', sans-serif; font-size:14px; color:#242424; line-height:24px; font-weight: 600;">\n' +
  '                        Politeknik Negeri Bandung\n' +
  '                    </td>\n' +
  '                </tr>\n' +
  '            </table>\n' +
  '            <!-- END HEADER -->\n' +
  '\n' +
  '            <table id="content" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width: 800px;">\n' +
  '                <tr>\n' +
  '                    <td height="50"></td>\n' +
  '                </tr>\n' +
  '\n' +
  '                <tr>\n' +
  '                    <td align="center" valign="top">\n' +
  '                        <table bgcolor="#FFFFFF" class="col-652" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">\n' +
  '                            <tbody>\n' +
  '                            <tr>\n' +
  '                                <td align="center" valign="top"\n' +
  '                                    style="background-size:cover; background-position:top;">\n' +
  '                                <table class="col-652" width="100%" border="0" align="center"\n' +
  '                                    cellpadding="0" cellspacing="0">\n' +
  '                                    <tbody>\n' +
  '\n' +
  '                                    <tr id="content">\n' +
  '                                        <table class="col-652" width="80%" order="0" cellpadding="0" cellspacing="0">\n' +
  '                                            <tr>\n' +
  '                                                <td align="center"\n' +
  '                                                    style="font-family: \'Montserrat\', sans-serif; font-size:32px; color:#242424; line-height:24px; font-weight: bold;">\n' +
  '                                                    Judul Informasi\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '\n' +
  '                                            <tr>\n' +
  '                                                <td height="50"></td>\n' +
  '                                            </tr>\n' +
  '\n' +
  '                                            <tr>\n' +
  '                                                <td id="paragraph" style="font-family: \'Montserrat\', sans-serif; color:#242424; line-height:24px; font-weight: 400; padding:0 50px;">\n' +
  '                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, dolor in sollicitudin tristique, purus metus venenatis quam, eget varius ligula nibh vel odio. Etiam pretium sagittis nisi, vel pretium dolor tristique ultrices. Vivamus egestas lacus ut est malesuada pretium in quis tortor.\n' +
  '\n' +
  '                                                    <br>\n' +
  '                                                    <br>\n' +
  '\n' +
  '                                                    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac ornare nunc. Aliquam sit amet sagittis lorem, non laoreet nisi. Integer suscipit, odio vel consectetur suscipit, risus mi imperdiet nisi, egestas dictum lectus ligula sagittis nunc. In tempor condimentum ipsum, nec convallis nunc volutpat eget. Maecenas sodales, nunc rutrum sollicitudin feugiat, metus dolor tristique metus, non commodo odio mi eget enim.\n' +
  '\n' +
  '                                                    <br>\n' +
  '                                                    <br>\n' +
  '\n' +
  '                                                    Etiam et lectus nec lacus volutpat volutpat quis a tellus. Sed ante odio, sagittis blandit turpis vitae, aliquam tincidunt turpis. Nunc suscipit dui nec orci viverra rhoncus nec sit amet tortor. Sed purus ex, sodales quis blandit vel, lobortis eu nibh. Aliquam quis urna ac neque sodales placerat. Sed convallis dolor quis libero semper, tincidunt mattis arcu laoreet.\n' +
  '\n' +
  '                                                    <br>\n' +
  '                                                    <br>\n' +
  '\n' +
  '                                                    <div align="center">\n' +
  '                                                        <a\n' +
  '                                                        class="button" href="https://www.google.com/" target="_blank">\n' +
  '                                                            BUTTON\n' +
  '                                                        </a>\n' +
  '                                                    </div>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </tr>\n' +
  '\n' +
  '                                    <tr>\n' +
  '                                        <td height="50"></td>\n' +
  '                                    </tr>\n' +
  '                                    </tbody>\n' +
  '                                </table>\n' +
  '                                </td>\n' +
  '                            </tr>\n' +
  '                            </tbody>\n' +
  '                        </table>\n' +
  '                    </td>\n' +
  '                </tr>\n' +
  '            </table>\n' +
  '\n' +
  '            <table id="footer" width="100%" height="100" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width: 800px;">\n' +
  '                <tr align="center">\n' +
  '                    <td>\n' +
  '                        <p>\n' +
  '                            <hr>\n' +
  '\n' +
  '                            <div style="font-family: \'Montserrat\', sans-serif; font-size:12px; color:#272343; line-height:24px; font-weight: 600;">\n' +
  '                                Copyright Politeknik Negeri Bandung. All right reserved.\n' +
  '                            </div>\n' +
  '                            <div style="font-family: \'Montserrat\', sans-serif; font-size:12px; color:#242424; line-height:24px; font-weight: 400;">\n' +
  '                                Jl. Gegerkalong Hilir, Ciwaruga, Kec. Parongpong, <br> Kabupaten Bandung Barat, Jawa Barat 40559\n' +
  '                            </div>\n' +
  '                        </p>\n' +
  '                    </td>\n' +
  '                </tr>\n' +
  '            </table>\n' +
  '        <!-- </tbody> -->\n' +
  '    </table>\n' +
  '</body>\n' +
  '</html>'
