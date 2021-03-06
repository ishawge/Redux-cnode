import React from 'react';
require('./PublishTopic.less');
const data = [{
	label: '分享',
	value: "share"
}, {
	label: '问答',
	value: "ask"
}, {
	label: '招聘',
	value: "job"
}];
import {
	createForm
} from 'rc-form';
import {
	NavBar,
	Icon,
	Picker,
	List,
	TextareaItem,
	Button,
	Toast,
	Modal
} from 'antd-mobile';

class Publish extends React.Component {
	constructor(props) {
		super(props);
		this.showModal = this.showModal.bind(this);
		this.onClose = this.onClose.bind(this);
		this.state = {
			modal1: false,
			modal2: false,
			modal3: false,
			modal4: false,
			modal5: false,
		};
	}
	showModal(key) {
		this.setState({
			[key]: true,
		});
	}
	onClose(key) {
		this.setState({
			[key]: false,
		});
	}
	render() {
		const {
			getFieldProps
		} = this.props.form;
		const {
			Login,
			PublishTopic,
			publish
		} = this.props;
		return (
			<div>
				<Picker data={data} cols={1} {...getFieldProps('select')} className="forss">
          			<List.Item arrow="horizontal">请选择发表类型</List.Item>
        		</Picker>
        		<List>
		          <TextareaItem
		            {...getFieldProps('title')}
		            title="标题"
		            autoHeight
		            labelNumber={5}
		          />
		          <TextareaItem
		            {...getFieldProps('content')}
		            rows={3}
		            title="内容"
		            autoHeight
		            placeholder="内容字数30字以上"
		          />
        		</List>
        		<div style={{visibility: PublishTopic.hasOwnProperty('error_msg')?'visible':'hidden',padding:'22px',color:'red',textAlign:'center',height:'30px'}}>{PublishTopic.error_msg}</div>
        		<Button onClick={()=>{
        			const title=getFieldProps('title').value;
        			const content=getFieldProps('content').value;

        			const select=getFieldProps('select').value;
        			//console.log(title)
        			//console.log(content)
        			if(!select){
        				//console.log(select)
        				this.showModal('modal1');
        				return
        			}else if(!title){
        				this.showModal('modal2')
        				return
        			}else if(title.hasOwnProperty('length')&&title.length<=3){
        				//console.log(title.length)
        				this.showModal('modal3');
        				return
        			}else if(!content){
        				this.showModal('modal4')
        				return
        			}else if(content.length<=5){
        				//console.log(content.length)
        				this.showModal('modal5');
        				return
        			}
        			const accesstoken=Login.accesstoken
        			publish(accesstoken,select.toString(),title,content)
        			}} className="btn" type="primary" style={{margin:'10%',width:'80%'}}>发布</Button>
					<Modal
			          title="发布失败"
			          transparent
			          maskClosable={false}
			          visible={this.state.modal1}
			          onClose={()=>this.onClose('modal1')}
			          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1'); } }]}
			        >
			          没选择发布类型<br/>
			         </Modal>
			         <Modal
			          title="发布失败"
			          transparent
			          maskClosable={false}
			          visible={this.state.modal2}
			          onClose={()=>this.onClose('modal2')}
			          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal2'); } }]}
			          >
			          标题不能为空<br/>
			          </Modal>
			          <Modal
			          title="发布失败"
			          transparent
			          maskClosable={false}
			          visible={this.state.modal3}
			          onClose={()=>this.onClose('modal3')}
			          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal3'); } }]}
			          >
			          标题字数太少<br />
			          </Modal>
			          <Modal
			          title="发布失败"
			          transparent
			          maskClosable={false}
			          visible={this.state.modal4}
			          onClose={()=>this.onClose('modal4')}
			          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal4'); } }]}
			          >
			          内容不能为空<br />
			          </Modal>
			          <Modal
			          title="发布失败"
			          transparent
			          maskClosable={false}
			          visible={this.state.modal5}
			          onClose={()=>this.onClose('modal5')}
			          footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal5'); } }]}
			          >
			          内容字数太少<br />
			          </Modal>
			</div>

		)
	}
};
export default createForm()(Publish);