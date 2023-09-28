import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import EditorialServicio from "../service/EditorialServicio";

export default function ModalEditorial({
  modal,
  setModal,
  nombreEditorial,
  setNombreEditorial,
  idEditorial,
}) {
  const editorialServicio = new EditorialServicio();

  const onGuardar = () => {
    // Actualiza el editorial en la base de datos usando el método `update()` del servicio EditorialServicio.
    editorialServicio.update(idEditorial, { nombre: nombreEditorial });

    setModal(false);
  };

  return (
    <Modal isOpen={modal} toggle={() => setModal(false)}>
      <ModalHeader>Modificar Editorial</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          label="Nombre"
          defaultValue={nombreEditorial}
          onChange={(e) => setNombreEditorial(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onGuardar}>
          Guardar
        </Button>
        <Button color="secondary" onClick={() => setModal(false)}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

ModalEditorial.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  nombreEditorial: PropTypes.string.isRequired,
  setNombreEditorial: PropTypes.func.isRequired,
  idEditorial: PropTypes.number.isRequired,
};
