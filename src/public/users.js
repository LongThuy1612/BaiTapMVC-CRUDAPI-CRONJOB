const API = '/users';

const tbody     = document.getElementById('user-tbody');
const modal     = document.getElementById('modal');
const form      = document.getElementById('user-form');
const modalTitle = document.getElementById('modal-title');
const alertBox  = document.getElementById('alert');

const fields = {
  id:        document.getElementById('user-id'),
  full_name: document.getElementById('full_name'),
  email:     document.getElementById('email'),
  age:       document.getElementById('age'),
  status:    document.getElementById('status'),
};

// ── Alert ────────────────────────────────────────────────
function showAlert(message, type = 'success') {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  clearTimeout(showAlert._t);
  showAlert._t = setTimeout(() => { alertBox.className = 'alert hidden'; }, 3000);
}

// ── Modal ────────────────────────────────────────────────
function openModal(user = null) {
  form.reset();
  if (user) {
    modalTitle.textContent = 'Sửa user';
    fields.id.value        = user.id;
    fields.full_name.value = user.full_name;
    fields.email.value     = user.email;
    fields.age.value       = user.age ?? '';
    fields.status.value    = user.status;
  } else {
    modalTitle.textContent = 'Thêm user';
    fields.id.value = '';
    fields.status.value = 'active';
  }
  modal.classList.remove('hidden');
}

function closeModal() { modal.classList.add('hidden'); }

document.getElementById('btn-open-create').addEventListener('click', () => openModal());
document.getElementById('btn-cancel').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// ── Render ───────────────────────────────────────────────
function renderRows(users) {
  if (!users.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Chưa có user nào.</td></tr>';
    return;
  }
  tbody.innerHTML = users.map((u) => `
    <tr>
      <td>${u.id}</td>
      <td>${u.full_name}</td>
      <td>${u.email}</td>
      <td>${u.age ?? '—'}</td>
      <td><span class="badge badge-${u.status}">${u.status}</span></td>
      <td>
        <div class="actions">
          <button class="btn btn-edit"   onclick="editUser(${u.id})">Sửa</button>
          <button class="btn btn-delete" onclick="deleteUser(${u.id}, '${u.full_name}')">Xóa</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ── Fetch list ───────────────────────────────────────────
async function loadUsers() {
  tbody.innerHTML = '<tr><td colspan="6" class="loading">Đang tải...</td></tr>';
  try {
    const res  = await fetch(API);
    const json = await res.json();
    renderRows(json.data);
  } catch {
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Lỗi kết nối server.</td></tr>';
  }
}

// ── Edit ─────────────────────────────────────────────────
window.editUser = async (id) => {
  try {
    const res  = await fetch(`${API}/${id}`);
    const json = await res.json();
    if (json.success) openModal(json.data);
  } catch {
    showAlert('Không thể tải thông tin user.', 'error');
  }
};

// ── Delete ───────────────────────────────────────────────
window.deleteUser = async (id, name) => {
  if (!confirm(`Xóa user "${name}"?`)) return;
  try {
    const res  = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) { showAlert('Đã xóa user.'); loadUsers(); }
    else showAlert(json.message, 'error');
  } catch {
    showAlert('Lỗi khi xóa user.', 'error');
  }
};

// ── Submit form ──────────────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id   = fields.id.value;
  const body = {
    full_name: fields.full_name.value.trim(),
    email:     fields.email.value.trim(),
    status:    fields.status.value,
  };
  const ageVal = fields.age.value;
  if (ageVal !== '') body.age = Number(ageVal);

  const url    = id ? `${API}/${id}` : API;
  const method = id ? 'PUT' : 'POST';

  try {
    const res  = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (json.success) {
      showAlert(json.message);
      closeModal();
      loadUsers();
    } else {
      showAlert(json.message, 'error');
    }
  } catch {
    showAlert('Lỗi kết nối server.', 'error');
  }
});

// ── Init ─────────────────────────────────────────────────
loadUsers();
