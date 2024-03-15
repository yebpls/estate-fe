import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../store/slices/accountSlice";
import { Pagination, Spin, Table } from "antd";
import dayjs from "dayjs";

function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { transaction, accountForAdmin, loading } = useSelector(
    (state) => state.accountReducer
  );
  const dispatch = useDispatch();

  let mapTransaction = transaction?.map((transaction) => {
    const account = accountForAdmin.find(
      (account) => account.id === transaction.accountId
    );
    return {
      ...transaction,
      accountName: account ? account.name : "Account not found",
      email: account ? account.email : "Not found",
    };
  });

  const startIndex = (currentPage - 1) * 8;
  const endIndex = startIndex + 8;

  const currentData = mapTransaction?.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);
  return (
    <div className="w-full py-4">
      <h1 className="text-center font-bold text-lg">Quản lí giao dịch</h1>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">STT</th>
                  <th className="px-4 py-3">Tên người giao dịch</th>
                  <th className="px-4 py-3">Loại giao dịch</th>
                  <th className="px-4 py-3">Số tiền</th>
                  <th className="px-4 py-3">Ngày giao dịch</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <div className="flex justify-center py-2 h-[40px]">
                    <Spin size="medium" className="inline-block" />
                    <p className="text-base ml-5 inline-block text-blue-500 ml-">
                      Chờ tý nhé
                    </p>
                  </div>
                ) : (
                  currentData &&
                  currentData.map((item, index) => (
                    <tr className="text-gray-700" key={item.id}>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold text-black">
                              {index + startIndex + 1}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold border">
                        <div>
                          <p className="font-semibold text-black">
                            {item.accountName}
                          </p>
                          <p className="text-xs text-gray-600">{item.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs border">
                        {item.status === 0 && (
                          <p className="bg-green-400 rounded-md py-2 px-1 text-white font-bold uppercase">
                            + Nạp tiền
                          </p>
                        )}
                        {item.status === 1 && (
                          <p className="bg-green-400 rounded-md py-2 px-1 text-white font-bold uppercase">
                            + Agency cọc
                          </p>
                        )}
                        {item.status === 2 && (
                          <p className="bg-red-400 rounded-md py-2 px-1 text-white font-bold uppercase">
                            - Trả tiền cho investor
                          </p>
                        )}
                        {item.status === 3 && (
                          <p className="bg-red-400 rounded-md py-2 px-1 text-white font-bold uppercase">
                            - Trả tiền cho agency
                          </p>
                        )}
                        {item.status === 4 && (
                          <p className="bg-green-400 rounded-md py-2 px-1 text-white font-bold uppercase">
                            + Investor trả tiền cho hệ thống
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs border">
                        {item.amount.toLocaleString("de-DE")}đ
                      </td>
                      <td className="px-4 py-3 text-sm border">
                        {dayjs(
                          new Date(
                            item.transactionDate[0],
                            item.transactionDate[1] - 1,
                            item.transactionDate[2],
                            item.transactionDate[3],
                            item.transactionDate[4],
                            item.transactionDate[5]
                          )
                        ).format("YYYY-MM-DD HH:mm:ss")}
                      </td>
                    </tr>
                  ))
                )}
                <Pagination
                  current={currentPage}
                  total={mapTransaction?.length}
                  showSizeChanger={false}
                  pageSize={8}
                  onChange={handlePageChange}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TransactionsPage;
