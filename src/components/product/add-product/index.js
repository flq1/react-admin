import React, { Component } from "react";
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message
} from "antd";
import BraftEditor from "braft-editor";
import { connect } from "react-redux";
import { getCategoryListAsync } from "../../../redux/actions";
import { reqAddProduct } from "../../../api/index";
import "braft-editor/dist/index.css";
import "./index.less";
const { Item } = Form;
const { Option } = Select;

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync
})
@Form.create()
class AddProduct extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryListAsync();
    }
  }

  submit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { name, desc, categoryId, price, detail } = values;

        reqAddProduct({
          name,
          desc,
          categoryId,
          price,
          detail: detail.toHTML()
        })
          .then(() => {
            message.success("添加商品成功");

            this.props.history.push("/product");
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      categories
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };

    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" className="go-back" />
            添加商品
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称"
                }
              ]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ]
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ]
            })(
              <Select placeholder="请选择商品分类">
                {categories.map(category => {
                  return (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "请输入商品价格"
                }
              ]
            })(
              <InputNumber
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/￥\s?|(,*)/g, "")}
                className="product-price"
              />
            )}
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("detail", {
              rules: [
                {
                  required: true,
                  message: "请输入商品详情"
                }
              ]
            })(<BraftEditor className="product-detail" />)}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default AddProduct;
