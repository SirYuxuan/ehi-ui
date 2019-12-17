globalThis.form = {
    formOnCallback: undefined,
    render(option) {
        option = option || {}
        let el = option.el || 'form'
        //判断条件是否为容器,如果为容器则遍历容器下所有表单组件
        let arr = ['button', 'input']
        if (arr.indexOf(el) !== -1) {
            eval(`this.render${el.charAt(0).toUpperCase() + el.substring(1)}(document)`)
        } else {
            let doms = document.querySelectorAll(el)
            for (let i = 0; i < doms.length; i++) {
                this.renderButton(doms[i])
                this.renderInput(doms[i])
            }
        }
    },
    renderDom(dom, type, className) {
        let buttons = dom.getElementsByTagName(type)
        for (let i = 0; i < buttons.length; i++) {
            let classList = buttons[i].classList
            if (!classList.contains(className)) {
                classList.add(className)
            }
            let filter = buttons[i].getAttribute('yxu-filter')
            if (filter) {
                buttons[i].addEventListener('click', () => {
                    if (this.formOnCallback) {
                        this.formOnCallback({'filter': filter})
                    }
                })
            }
        }
    },
    on(callback) {
        this.formOnCallback = callback
    },
    renderButton(dom) {
        this.renderDom(dom, 'button', 'yxu-btn')
    },
    renderInput(dom) {
        this.renderDom(dom, 'input', 'yxu-input')
    }
}