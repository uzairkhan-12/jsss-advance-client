/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalLayout from '@/components/modals/modalLayout';
import Button from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteModal from '@/components/ui/DeleteModal';
import Notification from '@/components/alerts/NotificationsPopup';
import ErrorPopup from '@/components/alerts/ErrorPopup';
import AddEditServices from './addEditServices';
import { useDispatch } from 'react-redux';
import {
  deleteService,
  fetchServices,
} from '@/redux/features/user/content/services-slice';
import { useAppSelector } from '@/redux/store';

const Services = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [service_id, setServiceId] = useState<string>('');
  const dispatch = useDispatch<any>();
  const services = useAppSelector(state => state.servicesReducer.services);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  function handleOpenModal() {
    setOpenModal(!showDeleteModal);
  }
  function handleEditModal(id: any) {
    setServiceId(id);
    setOpenEditModal(true);
  }

  // Function to toggle the DeleteModal
  const toggleDeleteModal = (id: string) => {
    setServiceId(id);
    setShowDeleteModal(!showDeleteModal);
  };

  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      dispatch(deleteService(service_id));
      setShowDeleteModal(false);
      setSuccessMessage('service deleted successfully.');
    } catch (error) {
      setErrorMessage('Error while deleting');
    }
  };

  function renderServices() {
    if (services && services.length > 0) {
      return services?.map((service: any) => (
        <div
          className="grid md:grid-cols-2 grid-cols-1 gap-y-2 items-start md:items-center pb-2 border-b-2 justify-between"
          key={service?.id}
        >
          <div className="flex  items-start flex-col md:flex-row md:items-center gap-x-3">
            <div
              className="h-16 w-1/3 min-w-28 rounded-lg"
              style={{
                backgroundImage: `url(${
                  service?.posters?.length > 0
                    ? service?.posters[0]?.url
                    : 'https://res.cloudinary.com/instagramcloude/image/upload/v1658385511/h7jnoer0whvtdn2kpcmo.jpg'
                })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <p
              className="cursor-pointer w-2/3"
              onClick={() => handleEditModal(service._id)}
            >
              {service?.title}
            </p>
          </div>
          <div className="flex justify-start md:justify-end items-center gap-x-2">
            <RiDeleteBin6Line
              className="text-red-400 cursor-pointer h-6 w-6 hover:text-red-500"
              onClick={() => toggleDeleteModal(service._id)}
            />
          </div>
        </div>
      ));
    }
    return (
      <div className="flex border p-1 items-center justify-center rounded-lg border-red-300">
        <p className="">No Service found!</p>
      </div>
    );
  }

  return (
    <div>
      {errorMessage && <ErrorPopup errors={[errorMessage]} />}
      {successMessage && (
        <Notification
          header="Notification"
          notif={successMessage}
          setMessage={setSuccessMessage}
        />
      )}
      <DeleteModal
        handleCloseModal={toggleDeleteModal}
        handleDelete={handleDelete}
        modalHeader="Delete Confirmation"
        modalParagraph="Are you sure you want to delete this item?"
        showDeleteModal={showDeleteModal}
      />
      <ModalLayout open={openModal} setOpen={setOpenModal} title="Add Service">
        <AddEditServices />
      </ModalLayout>
      <ModalLayout
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Edit Service"
      >
        <AddEditServices serviceId={service_id} />
      </ModalLayout>
      <Button
        buttonStyles="bg-black text-white hover:bg-gray-900 px-3 py-2"
        icon={<IoMdAddCircle />}
        onClick={handleOpenModal}
        title="Add Service"
        type={'button'}
      />
      <div>
        <div className="flex flex-col gap-y-2 mt-5">{renderServices()}</div>
      </div>
    </div>
  );
};

export default Services;
