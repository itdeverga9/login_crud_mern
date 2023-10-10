import rekeningModel from "../models/rekening.model.js"
import responseHandler from "../handlers/response.handler.js";

const addRekening = async (req, res) => {
    try {
        const cekRekening = await rekeningModel.findOne(req.body.no_rek);

        if (cekRekening) responseHandler.badrequest(req, 'nomor rekening sudah ada.');

        const rekening = rekeningModel({
            ...req.body
        });

        await rekening.save();

        responseHandler.created(res, rekening)
    } catch {
        responseHandler.error(res)
    }
}

const updateRekening = async (req, res) => {
    try {
        const { no_rek, nominal } = req.body;

        const rekening = await rekeningModel.findOne({ no_rek: no_rek });

        if (!rekening) responseHandler.badrequest(res, 'Rekeninig tidak ada.');

        rekening.no_rek = no_rek;
        rekening.nominal = nominal;

        await rekening.save();

        responseHandler.ok(res, rekening);
    } catch {
        responseHandler.error(res)
    }
}

const deleteRekening = async (req, res) => {
    try {
        const { no_rek } = req.body;

        const remove = await rekeningModel.findOne({ no_rek: no_rek });

        if (!remove) responseHandler.badrequest(res, 'Rekeninig tidak ada, tidak ada yang dihapus.');

        await remove.remove();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res)
    }
}

const getRekeningByNasabah = async (req, res) => {
    try {
        const { id_nasabah } = req.body;

        const rekening = await rekeningModel.find({ nasabah: id_nasabah }).populate("Nasabah");

        if (!rekening) responseHandler.badrequest(res, 'Rekening tidak ditemukan');

        responseHandler.ok(res, rekening);
    } catch {
        responseHandler.error(res)
    }
}

export default { addRekening, updateRekening, deleteRekening, getRekening }