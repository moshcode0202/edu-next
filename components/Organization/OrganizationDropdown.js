import { useWorkspace } from '@/hooks/useWorkspace';

const OrganizationDropdown = () => {
    const workspace = useWorkspace();
    return (
        <select
            className="form-select"
            value={workspace.current().id}
            onChange={(e) => {
                workspace.toggle(e.target.value);
            }}
        >
            {workspace.list().map((d) => {
                return (
                    <option key={d.id} value={d.id}>
                        {d.name}
                    </option>
                );
            })}
        </select>
    );
};

export default OrganizationDropdown;
