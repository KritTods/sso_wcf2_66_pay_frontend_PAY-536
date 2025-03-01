'use client';
import React from 'react';
import { Col, Row, FormProps, Form, Radio } from 'wcf-component-lib/node_modules/antd';
import { searchColumn } from '@/constants/layoutColumn';
import { BaseForm, BaseItemInput, BaseButton, BaseItemDatePicker } from 'wcf-component-lib/src/components';
import { maxRule, minRule, requiredRule } from 'wcf-component-lib/src/rules/FormRulesFunction';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  cancelCutOffPayReservePaymentSelector,
  setFilter,
  FilterSearchType,
} from '@/store-redux/slices/cancel-cut-off-payment/reserve-payment';
import { useAppDispatch } from '@/store-redux/store';
import dayjs from 'dayjs';

export default function CardSearchTab({ dataTestId }: { dataTestId: string }): React.ReactElement {
  const dispatch = useAppDispatch();
  const { filter } = useSelector(cancelCutOffPayReservePaymentSelector);

  const onFinish: FormProps<FilterSearchType>['onFinish'] = (values) => {
    const searchObj = {
      documentNo: values.documentNo,
      paymentNo: values.paymentNo,
      payDate: values.payDate ? dayjs(values.payDate).format('YYYY-MM-DD') : '',
      advancePaymentType: values.advancePaymentType,
      operation: 'AND',
      pagination: {
        pageNumber: 0,
        pageSize: 10,
        orders: undefined,
      },
    };
    void dispatch(setFilter(searchObj));
  };

  return (
    <div className='flex p-6 bg-white shadow-sm rounded-xl'>
      <BaseForm name='cancelCutOffPayReservePaymentFilter' onFinish={onFinish} initialValues={filter}>
        <div className='w-full bg-white  rounded-xl flex flex-row gap-4'>
          <div className='w-[4px] h-[200px] bg-[#1C4651] rounded-full'></div>
          <div className='w-full'>
            <div className='flex flex-col gap-4'>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-documentNo-input-text`}
                    label='เลขที่เอกสาร'
                    itemName='documentNo'
                    placeholder='ระบุเลขที่เอกสาร'
                    rules={[minRule('เลขที่เอกสาร', 15), maxRule('เลขที่เอกสาร', 15)]}
                  />
                </Col>

                <Col {...searchColumn}>
                  <BaseItemInput
                    id={`${dataTestId}-filter-paymentNo-input-text`}
                    label='เลขที่ใบสั่งจ่าย'
                    itemName='paymentNo'
                    placeholder='ระบุเลขที่ใบสั่งจ่าย'
                    rules={[minRule('เลขที่ใบสั่งจ่าย', 15), maxRule('เลขที่ใบสั่งจ่าย', 15)]}
                  />
                </Col>
                <Col {...searchColumn}>
                  <BaseItemDatePicker
                    id={`${dataTestId}-filter-payDate-input-date`}
                    itemName='payDate'
                    label='วันที่ตัดจ่าย'
                    placeholder='เลือกวันที่ตัดจ่าย'
                    rules={[requiredRule('วันที่ตัดจ่าย')]}
                    disabled
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col {...searchColumn}>
                  <div>
                    <p className='text-label mb-2' id={`${dataTestId}-advancePaymentType-label`}>
                      ประเภทเบิกเงินรองจ่าย
                    </p>
                    <Form.Item name='advancePaymentType'>
                      <Radio.Group className='h-[48px] w-full' optionType='button' text-lg font-boldtyle='solid'>
                        <div className='flex gap-4 h-full w-full'>
                          <Radio.Button className='!h-full !w-full flex justify-center items-center' value={'W'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-PAY`}> เบิกเงินรองจ่าย</div>
                          </Radio.Button>
                          <Radio.Button className='!h-full !w-full flex justify-center items-center' value={'B'}>
                            <div id={`${dataTestId}-advancePaymentType-radio-FIN`}> ยืมเงินระหว่างวัน</div>
                          </Radio.Button>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={18}>
                  <div className='grid place-items-end h-20'>
                    <BaseButton
                      className='!min-w-[200px]'
                      size='middle'
                      icon={<SearchOutlined />}
                      htmlType='submit'
                      label={'ค้นหา'}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </BaseForm>
    </div>
  );
}
