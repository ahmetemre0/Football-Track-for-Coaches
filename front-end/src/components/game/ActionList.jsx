import Action from './Action';


export default function ActionList({ actions, onActionClick }) {


    return (
        <header className="bg-white shadow">
            <div className="flex justify-center max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-evenly w-2/3">
                    {actions?.map((action) => action.hasArea === 0 && (
                        <div
                            key={action.ID}
                            className="flex flex-col items-center w-24 space-y-2" // Fixed width and spacing
                        >
                            <Action
                                action={action}
                                onActionClick={onActionClick}
                            />
                        </div>
                    ))}
                </div>
            </div>


        </header>
    );
}
