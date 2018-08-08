import '../../../style/pagination/pagination.scss'

class Pagination {
  static CLASS_NAME = {
    ITEM: 'pagination-item',
    LINK: 'pagination-link'
  }

  static PAGE_INFOS = [{
      id: "first",
      content: "首页"
    },
    {
      id: "prev",
      content: "前一页"
    },
    {
      id: "next",
      content: "后一页"
    },
    {
      id: "last",
      content: "尾页"
    },
    {
      id: "",
      content: "..."
    }
  ]

  constructor(selector, options = {}) {
    // 默认配置
    this.options = {
      curr: 1,
      pageShow: 2,
      ellipsis: true,
      hash: false
    };
    Object.assign(this.options, options);
    this.init(selector);
  }

  changePage () {
    let pageElement = this.pageElement;
    this.addEvent(pageElement, "click", (ev) => {
      let e = ev || window.event;
      let target = e.target || e.srcElement;
      if (target.nodeName.toLocaleLowerCase() == "a") {
        if (target.id === "prev") {
          this.prevPage();
        } else if (target.id === "next") {
          this.nextPage();
        } else if (target.id === "first") {
          this.firstPage();
        } else if (target.id === "last") {
          this.lastPage();
        } else if (target.id === "page") {
          this.goPage(parseInt(target.innerHTML));
        } else {
          return;
        }
        this.renderPages();
        this.options.callback && this.options.callback({
          curr: this.pageNumber,
          limit: this.options.limit,
          isFirst: false
        });
        this.pageHash();
      }
    });
  }

  init(selector) {
    // 分页器元素
    this.pageElement = this.$(selector)[0];
    // 数据总数
    this.dataCount = this.options.count;
    // 当前页码
    this.pageNumber = this.options.curr;
    // 总页数
    this.pageCount = Math.ceil(this.options.count / this.options.limit);
    // 渲染
    this.renderPages();
    // 执行回调函数
    this.options.callback && this.options.callback({
      curr: this.pageNumber,
      limit: this.options.limit,
      isFirst: true
    });
    // 改变页数并触发事件
    this.changePage();
  }
}
export default Pagination;