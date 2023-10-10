import nasabahModel from "../models/nasabah.model.js"
import responseHandler from "../handlers/response.handler.js"

const addNasabah = async (req, res) => {
    try {
        const { nama, alamat, telp } = req.body;

        const nasabah = nasabahModel;

        nasabah.nama = nama;
        nasabah.alamat = alamat;
        nasabah.telp = telp;

        await nasabah.save();

        responseHandler.created(res, nasabah)
    } catch {
        responseHandler.error(res)
    }
}

const updateNasabah = async (req, res) => {
    try {
        const { nama, alamat, telp, id } = req.body;

        const nasabah = nasabahModel.findOne({ id });

        if (!nasabah) responseHandler.badrequest(res, 'Nasabah tidak ditemukan');

        nasabah.nama = nama;
        nasabah.alamat = alamat;
        nasabah.telp = telp;

        await nasabah.save();

        responseHandler.created(res, nasabah)
    } catch {
        responseHandler.error(res)
    }
}

const deleteNasabah = async (req, res) => {
    try {
        const { id } = req.body

        const nasabah = await nasabahModel.findByIdAndRemove({ id });

        if (!nasabah) responseHandler.badrequest(res, 'Nasabah tidak ditemukan')

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res)
    }
}

const getAllNasabah = async (req, res) => {
    try {
        const nasabah = await nasabahModel.find({})

        if (!nasabah) responseHandler.badrequest(res, 'Nasabah kosong.');

        responseHandler.ok(res, nasabah)
    } catch {
        responseHandler.error(res)
    }
}

export default { addNasabah, updateNasabah, getAllNasabah, deleteNasabah }