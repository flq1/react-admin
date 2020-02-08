import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal, message } from "antd";
import { connect } from "react-redux";

import CategoryForm from "./category-form";
import {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
} from "../../redux/actions";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
})
class Category extends Component {
  state = {
    isShowCategoryModal: false,

    category: {}
  };

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryListAsync();
    }
  }

  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",

      render: category => {
        return (
          <div>
            <Button type="link" onClick={this.showCategoryModal(category)}>
              修改分类
            </Button>
            <Button type="link" onClick={this.delCategory(category)}>
              删除分类
            </Button>
          </div>
        );
      }
    }
  ];

  /**
   * 删除分类
   */
  delCategory = category => {
    return () => {
      Modal.confirm({
        title: `您确认要删除${category.name}分类吗?`,
        onOk: () => {
          this.props
            .deleteCategoryAsync(category._id)
            .then(() => {
              message.success("删除分类成功~");
            })
            .catch(err => {
              message.error(err);
            });
        }
      });
    };
  };

  //添加/修改分类

  setCategory = () => {
    const { validateFields, resetFields } = this.CategoryForm.props.form;
    const {
      category: { name, _id }
    } = this.state;

    validateFields((err, values) => {
      if (!err) {
        const { categoryName } = values;

        let promise = null;

        if (name) {
          promise = this.props.updateCategoryAsync(_id, categoryName);
        } else {
          promise = this.props.addCategoryAsync(categoryName);
        }

        promise
          .then(() => {
            message.success(`${name ? "修改" : "添加"}分类成功~`);

            resetFields();

            this.hiddenCategoryModal();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  // 隐藏添加分类对话框

  hiddenCategoryModal = () => {
    this.CategoryForm.props.form.resetFields();

    this.setState({
      isShowCategoryModal: false
    });
  };

  //显示添加分类对话框

  showCategoryModal = (category = {}) => {
    return () => {
      this.setState({
        isShowCategoryModal: true,
        category
      });
    };
  };

  render() {
    const { categories } = this.props;
    const { isShowCategoryModal, category } = this.state;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showCategoryModal()}>
            <Icon type="plus" />
            分类列表
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination={{
            defaultPageSize: 3,
            pageSizeOptions: ["3", "6", "9", "12"],
            showSizeChanger: true,
            showQuickJumper: true
          }}
          rowKey="_id"
        />

        <Modal
          title={category.name ? "修改分类" : "添加分类"}
          visible={isShowCategoryModal}
          onOk={this.setCategory}
          onCancel={this.hiddenCategoryModal}
          width={300}
        >
          <CategoryForm
            categoryName={category.name}
            wrappedComponentRef={form => (this.CategoryForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
