import React, {useRef, useState} from 'react'
import {Modal, Form, Input, Button, message} from 'antd'
import axios from 'axios'
import '../scss/modal.css'

const EditModal = ({visible, values, setVisible, getTableData, spinner}) => {
  const [form] = Form.useForm()
  const formRef = useRef()
  const URL = process.env.REACT_APP_SERVERLESS_URL
  const [loading, setLoading] = useState(false)

  const updateValues = async (newValues) => {
    setLoading(true)
    spinner(true)
    await axios
      .put(`${URL}/updateData/${values.stockCode}`, newValues)
      .then((results) => {
        if (results.status === 200) {
          message.open({
            type: 'success',
            content: `Record with StockCode ${values.stockCode} updated with given values`,
            duration: 5,
          })
          getTableData()
          spinner(false)
          setLoading(false)
          setVisible(false)
        }
      })
      .catch((error) => {
        console.log(error)
        message.open({
          type: 'error',
          content: `Error in updating Record with StockCode ${values.stockCode}`,
          duration: 10,
        })
      })
  }

  const cancelEdit = () => {
    formRef.current.resetFields()
    setVisible(false)
  }

  return loading ? (
    <div className="d-flex justify-content-center">
      <span className="sr-only loading-heading">Values are Updating....</span>
    </div>
  ) : (
    <Modal
      title="You can only update the following Values"
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={''}
    >
      <Form
        form={form}
        name="control-hooks"
        onFinish={(newValues) => updateValues(newValues)}
        ref={formRef}
      >
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              pattern: /^(?:\d*)$/,
              message: 'Quantity should contain just number',
              required: true,
            },
          ]}
        >
          <Input placeholder={values.quantity} />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[
            {
              pattern: /^[a-zA-Z ]*$/,
              required: true,
              message: 'Country should contain just string',
            },
          ]}
        >
          <Input placeholder={values.country} />
        </Form.Item>
        <Form.Item
          name="unitPrice"
          label="UnitPrice"
          rules={[
            {
              pattern: /^\d*\.?\d*$/,
              message: 'UnitPrice should contain just number',
              required: true,
            },
          ]}
        >
          <Input placeholder={values.unitPrice} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="modal-btn">
            Submit
          </Button>
          <Button
            type="primary"
            className="modal-btn modal-btn-cancel"
            onClick={() => cancelEdit()}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
