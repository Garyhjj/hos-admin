<template>
  <div class="clearfix">
    <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
      <a-button> <a-icon type="upload" /> Select File </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
  </div>
</template>
<script>
import { childMixin } from '@/utils/child-mixin'
import { mapGetters } from 'vuex'
import { readExcel } from '@/utils/util'

export default {
  mixins: [childMixin],
  data () {
    return {
      fileList: [],
      uploading: false
    }
  },
  created () {
    console.log(this.childMapping)
  },
  computed: {
    ...mapGetters(['childMapping'])
  },
  methods: {
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload () {
      const { fileList } = this
      readExcel(fileList[0]).then((res) => {
        console.log(res)
      })
      // const formData = new FormData()
      // fileList.forEach(file => {
      //   formData.append('files[]', file)
      // })
      // this.uploading = true
    }
  }
}
</script>
