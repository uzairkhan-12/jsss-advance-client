/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorPopup from '@/components/alerts/ErrorPopup';
import Notification from '@/components/alerts/NotificationsPopup';
import ModalLayout from '@/components/modals/modalLayout';
import DeleteModal from '@/components/ui/DeleteModal';
import Button from '@/components/ui/button';
import {
  deleteProduct,
  fetchProducts,
} from '@/redux/features/user/content/products-slice';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import AddEditProduct from './addEditProduct';
import { ProductsLoadingSkeliton } from '@/components/ui/loading-skeletons/loaders';

const Products = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [product_id, setProductId] = useState<string>('');
  const { products, isLoading } = useAppSelector(
    state => state.productsReducer,
  );
  const dispatch: any = useDispatch();

  function handleOpenModal() {
    setOpenModal(!showDeleteModal);
  }
  function handleEditModal(id: any) {
    setProductId(id);
    setOpenEditModal(true);
  }

  // Function to toggle the DeleteModal
  const toggleDeleteModal = (id: string) => {
    setProductId(id);
    setShowDeleteModal(!showDeleteModal);
  };

  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      dispatch(deleteProduct(product_id));
      setShowDeleteModal(false);
      setSuccessMessage('Product deleted successfully.');
    } catch (error) {
      setErrorMessage('Error while deleting');
    }
  };

  function renderProducts() {
    if (isLoading) {
      return <ProductsLoadingSkeliton />;
    }
    if (products && products.length > 0 && !isLoading) {
      return products.map((product: any) => (
        <div
          className="grid md:grid-cols-3 grid-cols-1 gap-y-2 items-start md:items-center pb-2 border-b-2 justify-between"
          key={product._id}
        >
          <div className="flex  items-start flex-col md:flex-row md:items-center gap-x-3">
            <div
              className="h-16 w-1/3 min-w-28 rounded-lg"
              style={{
                backgroundImage: `url(${
                  product?.posters?.length > 0
                    ? product?.posters[0]?.url
                    : 'https://res.cloudinary.com/instagramcloude/image/upload/v1658385511/h7jnoer0whvtdn2kpcmo.jpg'
                })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <p
              className="cursor-pointer w-2/3"
              onClick={() => handleEditModal(product._id)}
            >
              {product.title}
            </p>
          </div>
          <div className="flex justify-start md:justify-center">
            <p>Qty: {product.quantity}</p>
          </div>
          <div className="flex justify-start md:justify-end items-center gap-x-2">
            {product.quantity > 0 ? (
              <p className="px-3 w-28 flex justify-center py-1 rounded-full border text-sm font-semibold border-green-500 text-green-500">
                In stock
              </p>
            ) : (
              <p className="px-3 w-28 flex justify-center py-1 rounded-full border text-sm font-semibold border-red-500 text-red-500">
                Out of stock
              </p>
            )}
            <RiDeleteBin6Line
              className="text-red-400 cursor-pointer h-6 w-6 hover:text-red-500"
              onClick={() => toggleDeleteModal(product._id)}
            />
          </div>
        </div>
      ));
    }
    return (
      <div className="flex border p-1 items-center justify-center rounded-lg border-red-300">
        <p className="">No product found!</p>
      </div>
    );
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
      <ModalLayout
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Edit Product"
      >
        <AddEditProduct productId={product_id} />
      </ModalLayout>
      <ModalLayout open={openModal} setOpen={setOpenModal} title="Add Product">
        <AddEditProduct />
      </ModalLayout>
      <Button
        buttonStyles="bg-black text-white hover:bg-gray-900 px-3 py-2"
        icon={<IoMdAddCircle />}
        onClick={handleOpenModal}
        title="Add product"
        type={'button'}
      />
      <div>
        <div className="flex flex-col gap-y-2 mt-5">{renderProducts()}</div>
      </div>
    </div>
  );
};

export default Products;
