import { describe } from 'zip-tap';
import { createComponent } from '.';
import { Store, simpleStore } from './store';
import { UserInterface, ComponentBasics, ComponentTypes } from './interfaces';
import { Color } from './style';
import { bootstrapComponent } from './index/bootstrap';

describe(`components`, it => {
	it(`should create the component without any errors`, expect => {
		const App = createComponent((props: { cool: boolean }) => {
			if (props.cool) console.log('Cool!');

			// const button = UI.button({
			// 	text: simpleStore(``),
			// 	style: simpleStore({
			// 		backgroundColor: new Color([0, 0, 0, 1]),
			// 	}),
			// });

			// SELF.render(button);
		});

		const app = App({ cool: true });

		app.props.cool;

		bootstrapComponent(app);
	});

	const create = <User extends {}, ReturnVal extends {}>(fn: (props: User) => ReturnVal) => {
		return (props: User) => ({ ...fn(props), props });
	};

	const Me = create((props: { me: boolean }) => {
		return {
			Elijah: 'me',
		};
	});

	let me = Me({ me: true });

	me.props.me;
});
