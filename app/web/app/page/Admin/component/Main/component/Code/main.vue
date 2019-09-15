<template>
  <div>
    <h2 class="margin-bottom">邀请码管理</h2>
    <Table
      class="margin-bottom"
      :data="list"
      :columns="columns"
      :loading="loading"
      height="520"
      @on-selection-change="onSelectionChange"
    />
    <Row type="flex" justify="end" align="middle">
      <Page :total="total" :current="page" :page-size="pagesize" simple />
      <Button class="margin-lr-sm" type="primary" @click="addCode">创建邀请码</Button>
      <Button type="error" :disabled="selection.length === 0" @click="rmvCode">删除邀请码</Button>
    </Row>
  </div>
</template>

<script>
import { ERR_OK, addCode, rmvCode, modCode, lstCode, createCode } from 'app/api/code'
export default {
  name: 'LeeCode',
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      list: [],

      loading: false,
      columns: [
        {
          type: 'selection',
          width: 55,
          align: 'center',
        },
        {
          key: 'value',
          title: '邀请码',
          minWidth: 180,
          render: (h, { row }) => h('LeeIconLabel', {
            props: {
              icon: 'md-copy',
              label: '复制'
            },
            directives: [
              {
                name: 'clipboard',
                value: row.value
              }
            ],
            on: {
              success: () => {
                this.$Message.success('复制成功')
              }
            }
          }, row.value)
        },
        {
          key: 'bindTime',
          title: '是否使用',
          minWidth: 180,
          render: (h, { row }) => h('span', row.bindTime ? '已使用' : '未使用')
        },
        {
          key: 'remarks',
          title: '备注说明',
          minWidth: 300,
          render: (h, { row }) => h('LeeIconLabel', {
            props: {
              icon: 'md-create',
              label: '编辑'
            },
            on: {
              click: () => this.modCode(row)
            }
          }, row.remarks)
        },
        {
          key: 'createdTime',
          title: '创建时间',
          minWidth: 180
        }
      ],
      selection: []
    }
  },
  computed: {
    sortor() {
      return {}
    }
  },
  methods: {
    async lstCode(page = 1) {
      if (this.loading) return
      this.loading = true
      const { data } = await lstCode({
        pager: { page, pagesize: this.pagesize },
        sortor: this.sortor
      })
      this.loading = false
      if (data.status === ERR_OK) {
        this.page = data.data.page
        this.pagesize = data.data.pagesize
        this.total = data.data.total
        this.list = data.data.list
        this.selection = []
      }
    },

    async addCode() {
      const self = this
      new self.$Dialog({
        data() {
          return {
            title: '创建邀请码',
            form: {
              value: '',
              remarks: ''
            },
            rules: {
              value: [{ required: true, message: '邀请码不能为空' }]
            },
            loading1: false,
            loading2: false
          }
        },

        methods: {

          async createCode() {
            if (this.loading1) return
            this.loading1 = true
            const { data } = await createCode()
            this.loading1 = false
            if (data.status !== ERR_OK) {
              return this.$Message.error(data.errmsg)
            }
            this.form.value = data.data
          },

          async submit() {
            if (this.loading2) return
            if (!await this.$refs.form.validate()) return
            this.loading2 = true
            const { data } = await addCode({ ...this.form })
            this.loading2 = false
            if (data.status !== ERR_OK) {
              return this.$Message.error(data.errmsg)
            }
            this.close()
            await self.refreshData()
          }
        },

        template: `
        <Form ref="form" :model="form" :rules="rules" :label-width="60">
          <FormItem label="邀请码" prop="value">
            <Row type="flex" align="middle">
              <div class="flex-sub padding-right-sm">
                <i-input v-model="form.value" disabled />
              </div>
              <Button :loading="loading" @click="createCode">生成邀请码</Button>
            </Row>
          </FormItem>
          <FormItem label="备注说明">
            <i-input v-model="form.remarks" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" />
          </FormItem>
          <Button type="primary" long :loading="loading2" @click="submit">创建</Button>
        </Form>
        `
      }).open()
    },

    async modCode(item) {
      const self = this
      console.info(item)
      new self.$Dialog({
        data: {
          title: `编辑备注 - ${item.value}`,
          remarks: item.remarks || '',
          loading: false
        },

        computed: {
          disabled() {
            const remarks = item.remarks || ''
            return this.remarks === remarks
          }
        },

        methods: {
          async submit() {
            if (this.loading) return
            this.loading = true
            const { _id } = item
            const { data } = await modCode({ _id, remarks: this.remarks })
            this.loading = false
            if (data.status !== ERR_OK) {
              return this.$Message.error(data.errmsg)
            }
            this.close()
            await self.refreshData()
          }
        },

        template: `
        <Form :label-width="60">
          <FormItem label="备注说明">
            <i-input v-model="remarks" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" />
          </FormItem>
          <Button type="primary" long :disabled="disabled" :loading="loading" @click="submit">保存</Button>
        </Form>
        `
      }).open()
    },

    async rmvCode() {
      const _id = this.selection.map(v => v._id)
      if (_id.length === 0) return
      const self = this
      new self.$Dialog({
        data: {
          title: '删除邀请码',
          loading: false
        },

        methods: {
          async submit() {
            if (this.loading) return
            this.loading = true
            const { data } = await rmvCode({ _id })
            this.loading = false
            if (data.status !== ERR_OK) {
              return this.$Message.error(data.errmsg)
            }
            this.close()
            await self.lstCode()
          }
        },

        template: `
        <Alert type="warning">你将删除以下 ${_id.length} 项邀请码：${this.selection.map(v => v.value).join('、')}，此操作不可逆，是否继续？</Alert>
        <Button type="error" long :loading="loading" @click="submit">确定删除</Button>
        `
      }).open()
    },

    async refreshData() {
      await this.lstCode(this.page)
    },

    async onSelectionChange(selection) {
      this.selection = selection
    }
  },
  async mounted() {
    await this.lstCode()
  },
  installRouter(router) {
    router.regist('admin-code', '/admin/code', this, { title: '邀请码管理' })
  },
  createLayoutOptions({ addToMenu }) {
    addToMenu({ id: 'admin-code', icon: 'md-key', name: '邀请码管理', onClick: 'to:admin-code' })
  }
}
</script>