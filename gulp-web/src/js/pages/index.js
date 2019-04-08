define(['mui'], (mui) => {
	const address = document.querySelector('.address');
	const add = document.querySelector('.add');
	const zz = document.querySelector('.zz');
	const confirm = document.querySelector('.confirm');
	const con = document.querySelector('.con');
	const cancel = document.querySelector('.cancel');
	function init() {
		mui.init()
		ajaxfind();
		addEvent();
		
	}
	function ajaxfind() {
		mui.ajax('/api/getdata', {
			success: rs => {
				if(rs.code) {
					renderadd(rs.data);
					mui('.btns').on('tap','.del', deldata);
					mui('.btns').on('tap', '.updata', updata)
				}
			}
		})
		
	}
	function deldata() {
		let par = this.parentNode.parentNode.parentNode;
		zz.style.display = 'block';
		confirm.style.display = 'block';
		con.addEventListener('tap', () => {
			mui.ajax('/api/deldata', {
				data: {
					_id: this.getAttribute('data-id')
				},
				success: rs => {
					if(rs.code) {
						par.parentNode.removeChild(par)
					}
				}
			})
			zz.style.display = 'none';
			confirm.style.display = 'none';
		})
		cancel.addEventListener('tap', () => {
			zz.style.display = 'none';
			confirm.style.display = 'none';
		})
		
	}
	
	function updata() {
		location.href = `pages/adddata.html?_id=`+this.getAttribute('data-id');
	}
	function addEvent() {
		add.addEventListener('tap', () => {
			location.href = `pages/adddata.html`
		})
	
	}
	function renderadd(data) {
		address.innerHTML = data.map((item, index) => {
			return  `<div class="add-ite">
                    <div class="msg">
                        <div class="msg-tit">
                            <h1 class="name">${item.name}</h1>
                            <span class="tel">${item.tel}</span>
                        </div>
                        <span class="pos">
								${item.add}
							</span>
                    </div>
                    <div class="edit">
                        <div class="set">
                            <i class="${index==0?'active': ''}"></i>
                            <span>设为默认</span>
                        </div>
                        <div class="btns">
                            <button class="del" data-id="${item._id}">删除</button>
                            <button class="updata" data-id="${item._id}">修改</button>
                        </div>
                    </div>
                </div>`
		}).join('');
	}
	
	init()
})