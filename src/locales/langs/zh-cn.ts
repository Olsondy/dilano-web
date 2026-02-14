const local: App.I18n.Schema = {
  system: {
    title: 'DILANO 迪兰诺',
    subTitle: '企业管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    import: '导入',
    export: '导出',
    importSuccess: '导入成功',
    importFail: '导入失败',
    importTemplate: '导入模板',
    downloadTemplate: '下载模板',
    importResult: '导入结果',
    importSize: '请上传大小不超过',
    importEnd: '的文件',
    importFormat: '且格式为',
    importTip: '请上传大小不超过',
    exportSuccess: '导出成功',
    exportFail: '导出失败',
    updateExisting: '是否更新已经存在的数据',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    login: '登录',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    download: '下载',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    saveSuccess: '保存成功',
    updateSuccess: '更新成功',
    noChange: '没有进行任何操作',
    userCenter: '个人中心',
    yesOrNo: {
      yes: '是',
      no: '否'
    },
    second: '秒',
    selected: '已选择',
    anyRecords: '条记录',
    clear: '清空',
    noSelectRecord: '未选中任何记录'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    grayscale: '灰色模式',
    colourWeakness: '色弱模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式',
      reverseHorizontalMix: '一级菜单与子级菜单位置反转'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      },
      multilingual: {
        visible: '显示多语言按钮'
      },
      globalSearch: {
        visible: '显示全局搜索按钮'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '标签栏信息缓存',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    watermark: {
      visible: '显示全屏水印',
      text: '水印文本',
      enableUserName: '启用用户名水印'
    },
    tablePropsTitle: '表格配置',
    table: {
      size: {
        title: '表格大小',
        small: '小',
        medium: '中',
        large: '大'
      },
      bordered: '边框',
      bottomBordered: '底部边框',
      singleColumn: '设定行的分割线',
      singleLine: '设定列的分割线',
      striped: '斑马线条纹'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    resetCacheStrategy: {
      title: '重置缓存策略',
      close: '关闭页面',
      refresh: '刷新页面'
    },
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    system: '系统管理',
    system_menu: '菜单管理',
    tool: '系统工具',
    tool_gen: '代码生成',
    system_user: '用户管理',
    system_dict: '字典管理',
    system_tenant: '租户管理',
    'system_tenant-package': '租户套餐',
    system_config: '参数设置',
    system_dept: '部门管理',
    system_post: '岗位管理',
    monitor: '系统监控',
    monitor_logininfor: '登录日志',
    monitor_operlog: '操作日志',
    system_client: '客户端管理',
    system_notice: '通知公告',
    'social-callback': '单点登录回调',
    system_oss: '文件管理',
    'system_oss-config': 'OSS 配置',
    monitor_cache: '缓存监控',
    monitor_online: '在线用户',
    'user-center': '个人中心',
    system_role: '角色管理',
    project: '项目管理',
    project_info: '项目信息',
    customer: '客户管理',
    customer_info: '客户信息',
    customer_referral: '客户报备',
    exception: '异常页',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  menu: {
    system_tenant: '租户管理',
    system_log: '日志管理',
    'monitor_snail-job': '任务调度中心',
    monitor_admin: 'Admin 监控'
  },
  dict: {
    sys_user_sex: {
      male: '男',
      female: '女',
      unknown: '未知'
    },
    sys_show_hide: {
      show: '显示',
      hide: '隐藏'
    },
    sys_normal_disable: {
      normal: '正常',
      disable: '停用'
    },
    sys_yes_no: {
      yes: '是',
      no: '否'
    },
    sys_notice_type: {
      notice: '通知',
      announcement: '公告'
    },
    sys_notice_status: {
      normal: '正常',
      close: '关闭'
    },
    sys_oper_type: {
      insert: '新增',
      update: '修改',
      delete: '删除',
      grant: '授权',
      export: '导出',
      import: '导入',
      force: '强退',
      gencode: '生成代码',
      clean: '清空数据',
      other: '其他'
    },
    sys_common_status: {
      success: '成功',
      fail: '失败'
    },
    sys_grant_type: {
      password: '密码认证',
      sms: '短信认证',
      email: '邮件认证',
      miniapp: '小程序认证',
      social: '三方登录认证'
    },
    sys_device_type: {
      pc: 'PC',
      android: '安卓',
      ios: 'iOS',
      miniapp: '小程序'
    },
    wf_business_status: {
      revoked: '已撤销',
      draft: '草稿',
      pending: '待审核',
      completed: '已完成',
      cancelled: '已作废',
      returned: '已退回',
      terminated: '已终止'
    },
    wf_form_type: {
      custom_form: '自定义表单',
      dynamic_form: '动态表单'
    },
    wf_task_status: {
      revoke: '撤销',
      pass: '通过',
      pending_review: '待审核',
      cancel: '作废',
      return: '退回',
      terminate: '终止',
      transfer: '转办',
      delegate: '委托',
      copy: '抄送',
      add_sign: '加签',
      minus_sign: '减签',
      timeout: '超时'
    }
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        register: '注册',
        userNamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住密码',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    home: {
      branchDesc:
        '为了方便大家开发和更新合并，我们对main分支的代码进行了精简，只保留了首页菜单，其余内容已移至example分支进行维护。预览地址显示的内容即为example分支的内容。',
      morningGreeting: '早上好，{userName}！🌞 新的一天已经开始！',
      afternoonGreeting: '下午好！{userName}! ☀️, 今天的进度条已过半，加油！',
      eveningGreeting: '晚上好，{userName}！🌙 忙碌了一天，辛苦啦。',
      lastNightGreeting: '夜深了{userName}！🌙 请注意休息。',
      weatherDesc: '今日多云转晴，20℃ - 25℃!',
      projectCount: '项目数',
      customerCount: '报备客户数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      projectNews: {
        title: '项目动态',
        moreNews: '更多',
        desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
        desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
        desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
        desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
      },
      creativity: '创意',
      comingSoon: '敬请期待'
    },
    common: {
      id: 'ID',
      createBy: '创建者',
      createTime: '创建时间',
      updateBy: '更新者',
      updateTime: '更新时间',
      remark: '备注',
      form: {
        remark: {
          required: '请输入备注',
          invalid: '备注不能为空'
        }
      }
    },
    system: {
      client: {
        title: '客户端列表',
        clientId: '客户端 ID',
        clientKey: '客户端 Key',
        clientSecret: '客户端秘钥',
        grantTypeList: '授权类型',
        deviceType: '设备类型',
        activeTimeout: 'Token 活跃超时时间',
        timeout: 'Token 固定超时',
        status: '状态',
        form: {
          clientId: {
            required: '请输入客户端 ID',
            invalid: '客户端 ID 不能为空'
          },
          clientKey: {
            required: '请输入客户端 Key',
            invalid: '客户端 Key 不能为空'
          },
          clientSecret: {
            required: '请输入客户端秘钥',
            invalid: '客户端秘钥不能为空'
          },
          grantTypeList: {
            required: '请选择授权类型',
            invalid: '授权类型不能为空'
          },
          deviceType: {
            required: '请选择设备类型',
            invalid: '设备类型不能为空'
          },
          activeTimeout: {
            required: '请输入 Token 活跃超时时间',
            invalid: 'Token 活跃超时时间不能为空',
            tooltip: '指定时间无操作则过期(单位：秒), 默认30分钟(1800秒)'
          },
          timeout: {
            required: '请输入 Token 固定超时',
            invalid: 'Token 固定超时不能为空',
            tooltip: '指定时间必定过期(单位：秒)，默认七天(604800秒)'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          }
        },
        addClient: '新增客户端',
        editClient: '编辑客户端'
      },
      config: {
        title: '参数配置列表',
        configName: '参数名称',
        configKey: '参数键名',
        configValue: '参数键值',
        configType: '是否内置',
        remark: '备注',
        createTime: '创建时间',
        refreshCache: '刷新缓存',
        refreshCacheSuccess: '刷新缓存成功',
        form: {
          configId: {
            required: '请输入参数主键',
            invalid: '参数主键不能为空'
          },
          configName: {
            required: '请输入参数名称',
            invalid: '参数名称不能为空'
          },
          configKey: {
            required: '请输入参数键名',
            invalid: '参数键名不能为空'
          },
          configValue: {
            required: '请输入参数键值',
            invalid: '参数键值不能为空'
          },
          configType: {
            required: '请选择是否内置',
            invalid: '是否内置不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          }
        },
        addConfig: '新增参数配置',
        editConfig: '编辑参数配置'
      },
      dept: {
        empty: '暂无部门信息',
        title: '部门列表',
        parentId: '上级部门',
        deptName: '部门名称',
        orderNum: '排序',
        deptCategory: '类别编码',
        leader: '负责人',
        phone: '联系电话',
        email: '邮箱',
        status: '状态',
        sort: '排序',
        createTime: '创建时间',
        expandAll: '全部展开',
        collapseAll: '全部收起',
        form: {
          parentId: {
            required: '请选择上级部门',
            invalid: '上级部门不能为空'
          },
          deptName: {
            required: '请输入部门名称',
            invalid: '部门名称不能为空'
          },
          orderNum: {
            required: '请输入排序',
            invalid: '排序不能为空'
          },
          deptCategory: {
            required: '请输入类别编码',
            invalid: '类别编码不能为空'
          },
          leader: {
            required: '请输入负责人',
            invalid: '负责人不能为空'
          },
          phone: {
            required: '请输入联系电话',
            invalid: '联系电话不能为空'
          },
          email: {
            required: '请输入邮箱',
            invalid: '邮箱不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          sort: {
            required: '请输入排序',
            invalid: '排序不能为空'
          },
          deptId: {
            required: '请输入部门id',
            invalid: '部门id不能为空'
          }
        },
        error: {
          getDeptDataFail: '获取部门用户数据失败',
          getDeptUserDataFail: '获取部门用户数据失败'
        },
        placeholder: {
          defaultLeaderPlaceHolder: '请选择负责人',
          addDataLeaderPlaceHolder: '仅在更新时可选择部门负责人',
          deptUserIsEmptyLeaderPlaceHolder: '该部门没有负责人'
        },
        addDept: '新增部门',
        editDept: '编辑部门'
      },
      dict: {
        title: '字典列表',
        dictTypeTitle: '字典类型列表',
        dictName: '字典名称',
        dictType: '字典类型',
        status: '状态',
        remark: '备注',
        createTime: '创建时间',
        refreshCacheSuccess: '刷新缓存成功',
        refreshCache: '刷新缓存',
        confirmDeleteDictType: '确定删除字典类型',
        data: {
          title: '字典数据列表',
          label: '字典标签',
          value: '字典键值',
          dictSort: '字典排序',
          isDefault: '是否默认',
          listClass: '标签样式',
          cssClass: 'CSS样式',
          status: '状态',
          remark: '备注',
          createTime: '创建时间'
        },
        form: {
          dictId: {
            required: '请输入字典主键',
            invalid: '字典主键不能为空'
          },
          dictCode: {
            required: '请输入字典编码',
            invalid: '字典编码不能为空'
          },
          dictName: {
            required: '请输入字典名称',
            invalid: '字典名称不能为空'
          },
          dictType: {
            required: '请输入字典类型',
            invalid: '字典类型不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          },
          dictLabel: {
            required: '请输入字典标签',
            invalid: '字典标签不能为空'
          },
          dictValue: {
            required: '请输入字典键值',
            invalid: '字典键值不能为空'
          },
          dictSort: {
            required: '请输入字典排序',
            invalid: '字典排序不能为空'
          },
          isDefault: {
            required: '请选择是否默认',
            invalid: '是否默认不能为空'
          },
          listClass: {
            required: '请选择回显样式',
            invalid: '回显样式不能为空'
          },
          cssClass: {
            required: '请输入样式属性（其他样式扩展）',
            invalid: 'CSS样式不能为空'
          }
        },
        addDict: '新增字典',
        editDict: '编辑字典',
        addDictData: '新增字典数据',
        editDictData: '编辑字典数据',
        addDictType: '新增字典类型',
        editDictType: '编辑字典类型',
        exportDictType: '导出字典类型',
        refreshDictType: '刷新列表',
        dictTypeIsEmpty: '暂无字典类型'
      },
      menu: {
        title: '菜单列表',
        parentId: '上级菜单',
        iconType: '图标类型',
        menuName: '菜单名称',
        icon: '菜单图标',
        orderNum: '排序',
        perms: '权限字符',
        component: '组件路径',
        path: '路由地址',
        externalPath: '外链地址',
        query: '路由参数',
        iframeQuery: 'iframe 地址',
        isFrame: '是否外链',
        isCache: '是否缓存',
        menuType: '菜单类型',
        visible: '显示状态',
        status: '菜单状态',
        createTime: '创建时间',
        cache: '缓存',
        noCache: '不缓存',
        rootName: '根目录',
        buttonPermissionList: '按钮权限列表',
        emptyMenu: '暂无菜单',
        menuDetail: '菜单详情',
        cascadeDeleteContent: '级联删除菜单将删除所选中的菜单，是否继续？',
        iconifyTip: 'iconify 地址：https://icones.js.org',
        isFrameTip: '选择是外链则路由地址需要以`http(s)://`开头',
        isCacheTip: '选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致',
        visibleTip: '选择隐藏则路由将不会出现在侧边栏，但仍然可以访问',
        statusTip: '选择停用则路由将不会出现在侧边栏，也不能被访问',
        permsTip: "控制器中定义的权限字符，如：`{'@'}SaCheckPermission('system:user:list')`",
        componentTip: '访问的组件路径，如：`system/user/index`，默认在`views`目录下',
        pathTip:
          'Router path，Example：`user`，If the external network address needs to be accessed in the internal link,then  `http(s)://` beginning',
        form: {
          parentId: {
            required: '请选择上级菜单',
            invalid: '上级菜单不能为空'
          },
          menuType: {
            required: '请选择菜单类型',
            invalid: '菜单类型不能为空'
          },
          menuIds: {
            required: '请选择菜单',
            invalid: '菜单不能为空'
          },
          icon: {
            required: '请选择菜单图标',
            invalid: '菜单图标不能为空'
          },
          menuName: {
            required: '请输入菜单名称',
            invalid: '菜单名称不能为空'
          },
          orderNum: {
            required: '请输入排序',
            invalid: '排序不能为空'
          },
          perms: {
            required: '请输入权限字符',
            invalid: '权限字符不能为空'
          },
          isFrame: {
            required: '请选择是否外链',
            invalid: '是否外链不能为空'
          },
          path: {
            required: '请输入路由地址',
            invalid: '路由地址不能为空'
          },
          component: {
            required: '请输入组件路径',
            invalid: '组件路径不能为空'
          },
          query: {
            required: '请输入路由参数',
            invalid: '路由参数不能为空'
          },
          isCache: {
            required: '请选择是否缓存',
            invalid: '是否缓存不能为空'
          },
          visible: {
            required: '请选择显示状态',
            invalid: '显示状态不能为空'
          },
          status: {
            required: '请选择菜单状态',
            invalid: '菜单状态不能为空'
          },
          permission: {
            required: '请输入权限标识',
            invalid: '权限标识不能为空'
          }
        },
        placeholder: {
          iconifyIconPlaceholder: '请输入图标',
          localIconPlaceholder: '请选择本地图标',
          queryKey: '请输入 Key',
          queryValue: '请输入 Value',
          queryIframe: '请输入 iframe 地址'
        },
        directory: '目录',
        menu: '菜单',
        button: '按钮',
        addMenu: '新增菜单',
        addChildMenu: '新增子菜单',
        editMenu: '编辑菜单',
        cascadeDelete: '级联删除菜单'
      },
      notice: {
        title: '通知公告列表',
        noticeTitle: '公告标题',
        noticeType: '公告类型',
        noticeContent: '公告内容',
        status: '状态',
        createTime: '创建时间',
        form: {
          noticeTitle: {
            required: '请输入公告标题',
            invalid: '公告标题不能为空'
          },
          noticeType: {
            required: '请选择公告类型',
            invalid: '公告类型不能为空'
          },
          noticeContent: {
            required: '请输入公告内容',
            invalid: '公告内容不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          }
        },
        addNotice: '新增公告',
        editNotice: '编辑公告'
      },
      oss: {
        title: '文件列表',
        fileName: '文件名称',
        originalName: '原始名称',
        fileSuffix: '文件后缀',
        url: '文件地址',
        createTime: '创建时间',
        service: '服务商',
        form: {
          file: {
            required: '请选择文件',
            invalid: '文件不能为空'
          }
        },
        upload: '上传文件',
        preview: '预览',
        download: '下载',
        copy: '复制链接',
        copySuccess: '复制成功'
      },
      ossConfig: {
        title: 'OSS配置列表',
        configKey: '配置键',
        accessKey: 'accessKey',
        secretKey: 'secretKey',
        bucketName: '桶名称',
        prefix: '前缀',
        endpoint: '域名',
        domain: '自定义域名',
        isHttps: '是否https',
        region: '地域',
        status: '状态',
        remark: '备注',
        createTime: '创建时间',
        form: {
          configKey: {
            required: '请输入配置键',
            invalid: '配置键不能为空'
          },
          accessKey: {
            required: '请输入accessKey',
            invalid: 'accessKey不能为空'
          },
          secretKey: {
            required: '请输入secretKey',
            invalid: 'secretKey不能为空'
          },
          bucketName: {
            required: '请输入桶名称',
            invalid: '桶名称不能为空'
          },
          prefix: {
            required: '请输入前缀',
            invalid: '前缀不能为空'
          },
          endpoint: {
            required: '请输入域名',
            invalid: '域名不能为空'
          },
          domain: {
            required: '请输入自定义域名',
            invalid: '自定义域名不能为空'
          },
          isHttps: {
            required: '请选择是否https',
            invalid: '是否https不能为空'
          },
          region: {
            required: '请输入地域',
            invalid: '地域不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          }
        },
        addOssConfig: '新增OSS配置',
        editOssConfig: '编辑OSS配置'
      },
      post: {
        title: '岗位列表',
        postCode: '岗位编码',
        postName: '岗位名称',
        postSort: '岗位排序',
        status: '状态',
        remark: '备注',
        createTime: '创建时间',
        form: {
          postCode: {
            required: '请输入岗位编码',
            invalid: '岗位编码不能为空'
          },
          postName: {
            required: '请输入岗位名称',
            invalid: '岗位名称不能为空'
          },
          postSort: {
            required: '请输入岗位排序',
            invalid: '岗位排序不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          }
        },
        addPost: '新增岗位',
        editPost: '编辑岗位'
      },
      role: {
        title: '角色列表',
        roleName: '角色名称',
        roleKey: '权限字符',
        roleSort: '角色排序',
        status: '状态',
        remark: '备注',
        menuPermission: '菜单权限',
        dataScope: '数据权限',
        createTime: '创建时间',
        form: {
          roleName: {
            required: '请输入角色名称',
            invalid: '角色名称不能为空'
          },
          roleKey: {
            required: '请输入权限字符',
            invalid: '权限字符不能为空'
          },
          roleSort: {
            required: '请输入角色排序',
            invalid: '角色排序不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          },
          menuIds: {
            required: '请选择菜单权限',
            invalid: '菜单权限不能为空'
          },
          deptIds: {
            required: '请选择部门权限',
            invalid: '部门权限不能为空'
          }
        },
        addRole: '新增角色',
        editRole: '编辑角色',
        configPermission: '分配权限',
        authorizedUsers: '分配用户',
        selectMenuPermission: '选择菜单权限',
        selectDataScope: '选择数据权限',
        selectDeptPermission: '选择部门权限'
      },
      tenant: {
        title: '租户列表',
        tenantName: '租户名称',
        tenantId: '租户编号',
        contactUserName: '联系人',
        contactPhone: '联系电话',
        companyName: '公司名称',
        licenseNumber: '营业执照编号',
        address: '地址',
        intro: '企业简介',
        domain: '域名',
        packageId: '租户套餐',
        expireTime: '过期时间',
        accountCount: '账号数量',
        status: '状态',
        createTime: '创建时间',
        form: {
          tenantName: {
            required: '请输入租户名称',
            invalid: '租户名称不能为空'
          },
          contactUserName: {
            required: '请输入联系人',
            invalid: '联系人不能为空'
          },
          contactPhone: {
            required: '请输入联系电话',
            invalid: '联系电话不能为空'
          },
          companyName: {
            required: '请输入公司名称',
            invalid: '公司名称不能为空'
          },
          licenseNumber: {
            required: '请输入营业执照编号',
            invalid: '营业执照编号不能为空'
          },
          address: {
            required: '请输入地址',
            invalid: '地址不能为空'
          },
          intro: {
            required: '请输入企业简介',
            invalid: '企业简介不能为空'
          },
          domain: {
            required: '请输入域名',
            invalid: '域名不能为空'
          },
          packageId: {
            required: '请选择租户套餐',
            invalid: '租户套餐不能为空'
          },
          expireTime: {
            required: '请选择过期时间',
            invalid: '过期时间不能为空'
          },
          accountCount: {
            required: '请输入账号数量',
            invalid: '账号数量不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          }
        },
        addTenant: '新增租户',
        editTenant: '编辑租户'
      },
      tenantPackage: {
        title: '租户套餐列表',
        packageName: '套餐名称',
        menuIds: '菜单权限',
        remark: '备注',
        status: '状态',
        createTime: '创建时间',
        form: {
          packageName: {
            required: '请输入套餐名称',
            invalid: '套餐名称不能为空'
          },
          menuIds: {
            required: '请选择菜单权限',
            invalid: '菜单权限不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          }
        },
        addTenantPackage: '新增租户套餐',
        editTenantPackage: '编辑租户套餐',
        statusChangeSuccess: '状态修改成功'
      },
      user: {
        title: '用户列表',
        userName: '用户名称',
        nickName: '用户昵称',
        deptName: '部门',
        phonenumber: '手机号码',
        status: '状态',
        createTime: '创建时间',
        password: '密码',
        confirmPassword: '确认密码',
        sex: '性别',
        roleIds: '角色',
        postIds: '岗位',
        email: '邮箱',
        avatar: '头像',
        remark: '备注',
        form: {
          userName: {
            required: '请输入用户名称',
            invalid: '用户名称不能为空'
          },
          nickName: {
            required: '请输入用户昵称',
            invalid: '用户昵称不能为空'
          },
          deptId: {
            required: '请选择部门',
            invalid: '部门不能为空'
          },
          phonenumber: {
            required: '请输入手机号码',
            invalid: '手机号码不能为空'
          },
          status: {
            required: '请选择状态',
            invalid: '状态不能为空'
          },
          password: {
            required: '请输入密码',
            invalid: '密码不能为空'
          },
          confirmPassword: {
            required: '请输入确认密码',
            invalid: '确认密码不能为空'
          },
          sex: {
            required: '请选择性别',
            invalid: '性别不能为空'
          },
          roleIds: {
            required: '请选择角色',
            invalid: '角色不能为空'
          },
          postIds: {
            required: '请选择岗位',
            invalid: '岗位不能为空'
          },
          email: {
            required: '请输入邮箱',
            invalid: '邮箱不能为空'
          },
          remark: {
            required: '请输入备注',
            invalid: '备注不能为空'
          }
        },
        addUser: '新增用户',
        editUser: '编辑用户',
        resetPassword: '重置密码',
        importUsers: '导入用户',
        exportTemplate: '导出模板',
        importSuccess: '导入成功',
        statusChangeSuccess: '状态修改成功'
      }
    }
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
}

export default local
