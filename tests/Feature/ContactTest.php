<?php

namespace Tests\Feature;

use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_display_contacts_index()
    {
        $contacts = Contact::factory(3)->create();

        $response = $this->get(route('contacts.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('contacts/index')
            ->has('contacts.data', 3)
        );
    }

    public function test_it_can_search_contacts()
    {
        $contact1 = Contact::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'company' => null,
            'phone' => null
        ]);
        $contact2 = Contact::factory()->create([
            'name' => 'Jane Smith', 
            'email' => 'jane@example.com',
            'company' => null,
            'phone' => null
        ]);

        $response = $this->get(route('contacts.index', ['search' => 'John']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('contacts/index')
            ->has('contacts.data', 1)
            ->where('search', 'John')
        );
    }

    public function test_it_can_display_contact_creation_form()
    {
        $response = $this->get(route('contacts.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('contacts/create')
        );
    }

    public function test_it_can_create_a_contact()
    {
        $contactData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+1234567890',
            'company' => 'Acme Corp',
            'address' => '123 Main St',
            'notes' => 'Important client',
        ];

        $response = $this->post(route('contacts.store'), $contactData);

        $response->assertRedirect();
        $this->assertDatabaseHas('contacts', $contactData);
    }

    public function test_it_validates_required_fields_when_creating_contact()
    {
        $response = $this->post(route('contacts.store'), []);

        $response->assertSessionHasErrors(['name', 'email']);
    }

    public function test_it_can_display_a_contact()
    {
        $contact = Contact::factory()->create();

        $response = $this->get(route('contacts.show', $contact));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('contacts/show')
            ->where('contact.name', $contact->name)
        );
    }

    public function test_it_can_display_contact_edit_form()
    {
        $contact = Contact::factory()->create();

        $response = $this->get(route('contacts.edit', $contact));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('contacts/edit')
            ->where('contact.id', $contact->id)
        );
    }

    public function test_it_can_update_a_contact()
    {
        $contact = Contact::factory()->create();
        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'phone' => '+0987654321',
            'company' => 'Updated Corp',
            'address' => '456 New St',
            'notes' => 'Updated notes',
        ];

        $response = $this->put(route('contacts.update', $contact), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('contacts', array_merge(['id' => $contact->id], $updateData));
    }

    public function test_it_can_delete_a_contact()
    {
        $contact = Contact::factory()->create();

        $response = $this->delete(route('contacts.destroy', $contact));

        $response->assertRedirect();
        $this->assertSoftDeleted($contact);
    }
}