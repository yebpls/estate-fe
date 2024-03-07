import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../store/slices/accountSlice";
import { Spin, Table } from "antd";
import dayjs from "dayjs";

function TransactionsPage() {
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

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);
  return (
    <div className="w-full py-4">
      <h1 className="text-center font-bold text-lg">Quản lí giao dịch</h1>
      <section class="container mx-auto p-6 font-mono">
        {loading ? (
          <Spin className="flex justify-center" />
        ) : (
          <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div class="w-full overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">STT</th>
                    <th class="px-4 py-3">Tên người giao dịch</th>
                    <th class="px-4 py-3">Loại giao dịch</th>
                    <th class="px-4 py-3">Số tiền</th>
                    <th class="px-4 py-3">Ngày giao dịch</th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {mapTransaction &&
                    mapTransaction.map((item, index) => (
                      <tr class="text-gray-700">
                        <td class="px-4 py-3 border">
                          <div class="flex items-center text-sm">
                            <div>
                              <p class="font-semibold text-black">
                                {index + 1}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-xs font-semibold border">
                          <div>
                            <p class="font-semibold text-black">
                              {item.accountName}
                            </p>
                            <p class="text-xs text-gray-600">{item.email}</p>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-xs border">
                          {item.status === 0 && (
                            <p class="px-2 py-2 inline text-xs rounded-md text-white bg-sky-400">
                              Nạp tiền
                            </p>
                          )}
                          {item.status === 1 && (
                            <p class="px-2 py-2 inline text-xs rounded-md text-white bg-green-400">
                              + Agency cọc
                            </p>
                          )}
                          {item.status === 2 && (
                            <p class="px-2 py-2 inline text-xs rounded-md text-white bg-red-400">
                              - Trả tiền cho investor
                            </p>
                          )}
                          {item.status === 3 && (
                            <p class="px-2 py-2 inline text-xs rounded-md text-white bg-red-400">
                              - Trả tiền cho agency
                            </p>
                          )}
                        </td>
                        <td class="px-4 py-3 text-xs border">
                          {item.amount.toLocaleString("de-DE")}đ
                        </td>
                        <td class="px-4 py-3 text-sm border">
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
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default TransactionsPage;
