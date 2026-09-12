const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input')
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');

let task = [ ];
const render = ( ) => {
    list . innerHTML = ' ' ;
    if (tasks . length === 0) {
    const li = document . createElement( 'li' );
    li.textContent = '暂无任务' ;
    list.appendChild( li ) ;
    return;
}
task . forEach(task => {
    consit li = document . createElement( 'li' );
    li . textContent = task . text;
    if ( task . done ) li . classlist . add（ 'done' ；
    list . appendChild( li );
});
};

form . addEventlistener( 'submit' , (e) => {
    e . preventDefault( );
    const text = input . value . trim( );
    if ( text === ' ' )  {
        tip . textContent = '任务名不能空' ;
        return;
    }
    task . push( { text : text , done: false } );
    tip . textContent = ' ';
    input . value = ' ' ;
    render( ) ;
});

    render( ) ;

const filters = document . querySelector( ' . filters' );
let currentFilter === 'all'; // all / active / done

const render = ( ) => {
    list . innerHTML = ' ' ;
    const  shown = tasks . filter( t =>
        currentFilter === 'all' ? true :
        currentFilter === 'active' !t.done : t . done
    );
    if (shown . length === 0)  {
        const  li = document . createElement( 'li' );
        li . textContent = '没有符合条件的任务' ;
        list . appendChild( li ) ;
        return ;
    }
    shown . forEach( task => {
        const  li  =  document . createElement( 'li' );
        li . textContent  = task . text ;
        if ( task . done ) li . classList . add( 'done')
        li . addEventListener( 'click' , ( ) => {
            task . done = !task . done;
            render( )
    });
};
filters . addEventListener( 'click' , (e) => {
    if  (e . target . tagName !== 'BUTTON' ) return ;
    currentFilter = e . target . dataset . filter;
    render( );
 });

    
