'use client';
import React, { useEffect, useMemo } from 'react';
import CardDetail from '@/modules/cancel-payment/wrongfund-payment/component/cardDetail';
import CardCash from '@/components/common/cardCash';
import CardCheque from '@/components/common/cardCheque';
import CardTableWrongFundPayment from '@/components/common/cardTableWrongFundPayment';
import CardTableReceipt from '@/components/common/cardTableReceipt';
import CardTableThananat from '@/components/common/cardTableThananat';
import {
  cancelWrongFundSelector,
  getWrongFundDetailService,
} from '@/store-redux/slices/cancel-payment/wrongfund-payment';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store-redux/store';
import { BaseButton, BaseLoading } from 'wcf-component-lib/src/components';
import { URL } from '@/constants/configPage';
export default function PaymentMoneyDetail(): React.ReactElement {
  const dataTestId = 'pageCancelWrongFundDetail';
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const dispatch = useAppDispatch();
  const { loading, pageDetail } = useSelector(cancelWrongFundSelector);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    // Call API Thunks
    void dispatch(getWrongFundDetailService(id));
  }, [dispatch, id]);

  const dataSource = useMemo(() => {
    return pageDetail;
  }, [pageDetail]);

  //loading Page
  if (loading) {
    return <BaseLoading size='default' />;
  }

  return (
    <div className='flex flex-col gap-4 mx-4 mb-6'>
      <CardDetail dataTestId={dataTestId} data={dataSource.cardHeader} />

      {dataSource.cardHeader.advancePaymentType === 'FIN' && (
        <>
          <CardTableWrongFundPayment dataTestId={dataTestId} data={dataSource.payments} />
          <CardTableReceipt dataTestId={dataTestId} data={dataSource.receipts} />
        </>
      )}

      {pageDetail.isCheque && <CardCheque dataSource={pageDetail.cheques} dataTestId={dataTestId} />}
      {!pageDetail.isCheque && <CardCash dataTestId={dataTestId} cash={pageDetail.cash} />}
      <CardTableThananat dataTestId={dataTestId} dataSource={pageDetail.moneys} />
      <div className='flex justify-center items-center gap-4'>
        <BaseButton
          id={`${dataTestId}-cancel-button`}
          size='large'
          type='cancel'
          label='ยกเลิก'
          className='w-[240px]'
          onClick={() => router.push(URL.cancelPayment.cancelWrongfundPayment.url)}
        />
      </div>
    </div>
  );
}
