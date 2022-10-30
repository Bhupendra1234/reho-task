import { Form, Typography, Input, Button, Divider, Modal, Statistic, Checkbox } from 'antd';
import './App.css';
import React, { useState, useCallback } from 'react';
import Layout from './components/layout';
const { Countdown } = Statistic;
const TIMER = 10;
function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0)
  const [selectSeat, setSelectSeat] = useState([])
  const [openSubmitModal, setOpenSubmitModal] = useState(false)
  const [bookedSeat, setBookedSeat] = useState([]);
  const [isDisable, SetIsDisable] = useState(false)
  const onFinish = (values) => {
    setRows(Number(values.rows));
    setCols(values.cols);
    setSelectSeat([])
    setBookedSeat([])
  }
  const onSeatSelect = useCallback((seat) => {
    if (!selectSeat.includes(seat) && !bookedSeat.includes(seat)) {
      setSelectSeat([...selectSeat, seat])
    } else {
      let array = selectSeat;
      setSelectSeat(array.filter(data => data !== seat))
    }
  }, [selectSeat]);

  const handleOk = () => {
    setBookedSeat([...bookedSeat, ...selectSeat])
    setSelectSeat([])
    SetIsDisable(false)
    setOpenSubmitModal(false)
  }
  const handleSubmitModal = () => {
    setOpenSubmitModal(true);
    SetIsDisable(false)
  }
  return (
    <div className='text-center m-5'>
      <Typography.Title level={2}>Ticket Booking App</Typography.Title>
      <div className='flex justify-center items-center'>
        <Form onFinish={onFinish}>
          <Form.Item name="rows" label="Enter Number of Rows">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="cols" label="Enter Number of Columns">
            <Input type="number" />
          </Form.Item>
          <Button htmlType="submit" type="primary">Generate</Button>
        </Form>
      </div>
      <div className='flex justify-between m-10'>
        <div className='flex justify-center'>
          <p className='w-4 h-4 border-2 border-green-500  mr-2'></p>Avaliable
          <p className='w-4 h-4 bg-green-500 ml-3 mr-2'></p>Selected
          <p className='w-4 h-4 bg-gray-300 ml-3 mr-2'></p>Booked
        </div>
        <div>
          <Typography.Title level={5}>Total Booking Cost: {selectSeat.length * 100}</Typography.Title>
          {selectSeat?.length ? <Button type="danger" onClick={handleSubmitModal}>Book Ticket</Button> : null}
        </div>
      </div>
      {(rows * cols) ?
        <div className='flex flex-wrap justify-between  w-100 border-2 border-green-500 m-10'>
          {Array.from(Array(rows * cols), (e, i) => {
            return <><Layout key={i} seat={i + 1} onSeatSelect={onSeatSelect} selectSeat={selectSeat} bookedSeat={bookedSeat} />
              {(i + 1) % cols === 0 && <Divider />}
            </>
          })}
        </div> : null}
         <br/>

      <Modal footer={null} header={null} open={openSubmitModal} onCancel={() => setOpenSubmitModal(false)}>
        <div className='text-center'>
          <Typography.Paragraph>Are you sure, Do you want to book the selected tickets?</Typography.Paragraph>
          <Typography.Paragraph>Seat No. : {String(selectSeat).replaceAll(',', ', ')}</Typography.Paragraph>
          <Typography.Paragraph >Total Booking Cost:  {selectSeat.length * 100}</Typography.Paragraph>
        </div>
        <div className='space-x-4 flex justify-center items-center'>
          <Button onClick={handleOk} disabled={isDisable} type='primary'> Confirm</Button>
          <Button onClick={() => setOpenSubmitModal(false)} type='secondary'> Cancel</Button>
        </div>
        <div className='text-sm text-center'>
          <Countdown valueStyle={{ fontSize: '15px' }} format={'mm:ss'} value={Date.now() + TIMER * 1000}
            onFinish={() => {
              SetIsDisable(true)
            }} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
