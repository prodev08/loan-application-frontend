import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IBalanceRequest, ISubmitRequest, IBalanceResponse } from "@/types";

interface IStart {
  isLoading: boolean;
  loan: IBalanceResponse | null;
  requestFetch: ({
    businessId,
    loanAmount,
    accountName,
  }: IBalanceRequest) => void;
  requestSubmit: ({ loanId }: ISubmitRequest) => void;
}

const initialValues = {
  loanAmount: 1000,
  businessId: "0",
  accountName: "xero",
};

const Loan: FC<IStart> = ({ isLoading, loan, requestFetch, requestSubmit }) => {
  const [reviewConfirm, setReviewConfirm] = useState(false);

  const validationSchema = Yup.object().shape({
    loanAmount: Yup.number().required("This field is required!"),
    businessId: Yup.string().required("This field is required!"),
    accountName: Yup.string().required("This field is required!"),
  });

  const handleFetch = (formValue: IBalanceRequest) => {
    const { businessId, loanAmount, accountName } = formValue;
    requestFetch({ businessId, loanAmount, accountName });
  };

  const handleSubmit = (loanId: string) => {
    requestSubmit({ loanId });
  };

  const closeModal = () => {
    setReviewConfirm(false);
  };

  useEffect(() => {
    if (!isLoading && loan) {
      setReviewConfirm(true);
    } else {
      setReviewConfirm(false);
    }
  }, [isLoading, loan]);

  return (
    <div className="start-page">
      <div className="component-color rounded-md w-[550px] h-100 p-[65px]">
        <Formik
          className="max-w-sm mx-auto"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFetch}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Input your Business ID:
                </label>
                <Field
                  name="businessId"
                  type="text"
                  placeholder="0"
                  className="input-component"
                />
                <ErrorMessage
                  name="businessId"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Input loan amount:
                </label>
                <Field
                  name="loanAmount"
                  type="number"
                  placeholder="0"
                  className="input-component"
                />
                <ErrorMessage
                  name="loanAmount"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select a account:
                </label>
                <Field
                  as="select"
                  name="accountName"
                  className="input-component"
                >
                  <option value="xero" label="Xero" />
                  <option value="myob" label="MYOB" />
                </Field>
                <ErrorMessage
                  name="accountName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button type="submit" className="primary-button">
                Fetch Balance
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Confirm Dialog */}
      <Transition appear show={reviewConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-12"
                  >
                    Balance Sheets
                  </Dialog.Title>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            No
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Year
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Month
                          </th>
                          <th scope="col" className="px-6 py-3">
                            ProfitOrLoss
                          </th>
                          <th scope="col" className="px-6 py-3">
                            AssetsValue
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loan &&
                          loan.sheet.map((sheet, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td className="px-6 py-4">{index}</td>
                              <td className="px-6 py-4">{sheet.year}</td>
                              <td className="px-6 py-4">{sheet.month}</td>
                              <td className="px-6 py-4">
                                {sheet.profitOrLoss}
                              </td>
                              <td className="px-6 py-4">{sheet.assetsValue}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-11">
                    <button
                      type="button"
                      className={
                        "primary-button text-sm xl:text-lg py-3 border-2 text-white mt-2"
                      }
                      onClick={() => handleSubmit(loan!.loanId.toString())}
                    >
                      Submit Application
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Loan;
